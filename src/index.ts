 import Henta from 'henta';
 
 export default class HentadminPlugin {
  henta: Henta;
  statsSources = {};

  constructor(henta) {
    this.henta = henta;
  }

  setStatsSource(slug, chartType, handler) {
    this.statsSources[slug] = { chartType, handler };
  }

  async handler(message) {
    if (message.type === 'getStats') {
      try {
        const statsSource = this.statsSources[message.slug];
        return {
          chartType: statsSource.chartType,
          ...await statsSource.handler()
        }
      } catch (error) {
        this.henta.error(error.stack);
        throw error;
      }
    }

    if (message.type === 'getStatsParts') {
      return this.henta.util.loadConfig('hentadmin/statsParts.json');
    }

    return { }
  }
}
