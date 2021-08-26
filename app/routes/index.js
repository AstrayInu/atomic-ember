import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
export default class IndexRoute extends Route {
  @service api

  constructor() {
    super(...arguments)

    this.queryParams = {
      q: { refreshModel: true },
      stats: { refreshModel: true }
    }
  }

  async model() {
    let dompetData = await this.api.getData('dompet', this.params)
      , kategoriData = await this.api.getData('kategori', this.params)
      , transaksiData = await this.api.getData('transaksi', this.params)
    
    return {dompetData, kategoriData, transaksiData}
  }

  setupController(controller, { dompetData, kategoriData, transaksiData }) {
    controller.set('dompetData', dompetData)
    controller.set('kategoriData', kategoriData)
    controller.set('transaksiData', transaksiData)
  }
}
