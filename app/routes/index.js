import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
export default class IndexRoute extends Route {
  @service api

  async model() {
    let dompetData = await this.api.getData('dompet')
      , kategoriData = await this.api.getData('kategori')
      , transaksiData = await this.api.getData('transaksi')
    
    return {dompetData, kategoriData, transaksiData}
  }

  setupController(controller, { dompetData, kategoriData, transaksiData }) {
    controller.set('dompetData', dompetData)
    controller.set('kategoriData', kategoriData)
    controller.set('transaksiData', transaksiData)
  }
}
