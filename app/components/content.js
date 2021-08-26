import Component from '@ember/component';
import { inject as service } from '@ember/service';
import $ from 'jquery'
import { computed, action, set } from '@ember/object';

export default class ContentComponent extends Component {
  @service storage
  @service api

  @computed('type')
  get masterCheck() {
    return this.type == 'DOMPET' || this.type == "KATEGORI" ? true : false
  }

  @computed('type')
  get transaksiCheck() {
    return this.type == "DOMPET MASUK" || this.type == "DOMPET KELUAR" || this.type == 'result' ? true : false
  }

  @computed('type', 'stats')
  get subTitle() {
    if(this.type == 'LAPORAN') return 'transaksi'
    if(this.masterCheck) return this.stats == 1 ? `- Aktif` : this.stats == 2 ? '- Tidak Aktif' : `- Semua`
  }

  @action
  filterStatus(val) {
    set(this, 'stats', val)
    this.setFilter(val)
  }

  @action
  searchQuery(val) {
    this.setSearch(val)
  }

  @action
  async openForm(val) {
    if(val) await this.storage.lset('editData', val)
    $("#add-box").removeClass("d-none")
    $("#content-box").addClass("d-none")
  }

  @action
  setStatus(status, id) {
    let newStatus = status == 1 ? 2 : 1
    this.api.changeStatus({type: this.type, newStatus, id}).then(response => {
      console.log(response)
      alert("Berhasil ubah status!")
      location.reload()
    }).catch(e => {
      console.log(e)
      alert("Error")
    })
  }
}
