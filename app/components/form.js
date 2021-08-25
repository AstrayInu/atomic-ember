import Component from '@ember/component';
import $ from 'jquery'
import { inject as service } from '@ember/service';
import { computed, action, set } from '@ember/object';

export default class FormComponent extends Component {
  @service storage
  @service config
  @service api

  @computed('type')
  get masterCheck() {
    return this.type == 'DOMPET' || this.type == "KATEGORI" ? true : false
  }

  @computed('type')
  get transaksiCheck() {
    return this.type == "DOMPET MASUK" || this.type == "DOMPET KELUAR" || this.type == 'result' ? true : false
  }

  @computed('isValidName', 'isValidNilai')
  get isDisabled() {
    if(this.masterCheck) return !this.isValidName
    else return !this.isValidNilai
  }

  @computed('data')
  get kodeValue() {
    return this.data ? this.data.kode : this.type == "DOMPET MASUK" ? "WINxxxxxxxx" : "WOUTxxxxxxxx"
  }

  @computed('data')
  get currDate() {
    let d = new Date()
    return d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate()
  }

  @action
  closeAdd() {
    $("#add-box").addClass("d-none")
    $("#content-box").removeClass("d-none")
    this.storage.lremove("editData")
  }

  @action
  inputName() {
    set(this, 'isValidName', this.name.length>4?true:false)
  }

  @action
  inputNilai() {
    set(this, 'isValidNilai', this.cashVal.match(/[0-9]*/))
    if(!Number(this.cashVal)) set(this, 'cashVal', '')
    else set(this, 'isValidNilai', true)
  }

  @action
  inputCategory(val) {
    set(this, 'category', val)
  }
  
  @action
  inputDompet(val) {
    set(this, 'dompet', val)
  }

  @action
  setStatus(val) {
    set(this, 'status', Number(val))
  }

  @action
  submitForm() {
    let data = {
      deskripsi: $("#desc-input").val() 
    }
    if(this.type == 'DOMPET' || this.type == "KATEGORI") {
      data.nama = this.name
      if(this.type == 'DOMPET') data.referensi = this.ref
      data.status = this.status ? this.status : 1
    }
    if(this.type == "DOMPET MASUK" || this.type == "DOMPET KELUAR") {
      let d = new Date()
        , date = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()
        , time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()
      data.tanggal = date+' '+time
      data.kode = ''
      data.kategori_id = this.category ? this.category : this.kategoriData[0].id
      data.nilai = new Intl.NumberFormat('de-DE').format(this.cashVal)
      data.dompet_id = this.dompet ? this.dompet : this.dompetData[0].id
      data.status = this.type == "DOMPET MASUK" ? 1 : 2
    }
    let main = {
      type: this.type == "DOMPET MASUK" || this.type == "DOMPET KELUAR" ? 'transaksi' : this.type,
      data
    }
    // console.log(main)

    this.api.createData(main).then(response => {
      console.log(response)
      location.reload()
      alert("Berhasil menambah data :)")
    }).catch(e => {
      console.log(e)
      alert("Whoops, something happend :(")
    })
  }
}
