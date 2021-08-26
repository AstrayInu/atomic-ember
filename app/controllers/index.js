import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import $ from 'jquery'
import { computed, action, set } from '@ember/object';

export default class IndexController extends Controller {
  @service storage

  constructor() {
    super(...arguments);
    this.queryParams = [
      'stats', 'q'
    ]
  }

  @computed('type')
  get viewType() {
    return this.type || this.storage.lget("viewType") || 'DOMPET'
  }

  @computed('type', 'vieewType')
  get data() {
    if(this.type == 'DOMPET' || this.storage.lget("viewType") == "DOMPET" || !this.type) return this.dompetData
    if(this.type == "KATEGORI" || this.storage.lget("viewType") == "KATEGORI") return this.kategoriData
    if(this.type == "DOMPET MASUK" ||  this.storage.lget("viewType") == "DOMPET MASUK") return this.transaksiData.filter(x => x.status == 1)
    if(this.type == "DOMPET KELUAR" || this.storage.lget("viewType") == "DOMPET KELUAR") return this.transaksiData.filter(x => x.status == 2)
  }

  @action
  setFilter(val) {
    set(this, 'stats', val)
  }

  @action
  setSearch(val) {
    set(this, 'q', val)
  }

  @action
  changePage(val) {
    set(this, 'type', val)
    this.storage.lset("viewType", val)
    this.storage.lremove("editData")
    $("#add-box").addClass("d-none")
    $("#content-box").removeClass("d-none")
  }
}
