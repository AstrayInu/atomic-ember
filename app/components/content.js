import Component from '@ember/component';
import { inject as service } from '@ember/service';
import $ from 'jquery'
import { computed, action, set } from '@ember/object';

export default class ContentComponent extends Component {
  @computed('type')
  get showTable() {
    if(this.type == 'DOMPET' || this.type == "KATEGORI") {
      $("#nama").removeClass("d-none")
      if(this.type == "DOMPET") $("#ref").removeClass("d-none")
      $("#status").removeClass("d-none")
      $("#tgl").addClass("d-none")
      $("#kode").addClass("d-none")
      $("#cat").addClass("d-none")
      $("#nilai").addClass("d-none")
      $("#dompet").addClass("d-none")

      $("#nama-content").removeClass("d-none")
      if(this.type == "DOMPET") $("#ref-content").removeClass("d-none")
      $("#status-content").removeClass("d-none")
      $("#tgl-content").addClass("d-none")
      $("#kode-content").addClass("d-none")
      $("#cat-content").addClass("d-none")
      $("#nilai-content").addClass("d-none")
      $("#dompet-content").addClass("d-none")
    } else if(this.type == "DOMPET MASUK" || this.type == "DOMPET KELUAR" || this.type == 'result') {
      $("#nama").addClass("d-none")
      $("#ref").addClass("d-none")
      $("#status").addClass("d-none")
      $("#tgl").removeClass("d-none")
      $("#kode").removeClass("d-none")
      $("#cat").removeClass("d-none")
      $("#nilai").removeClass("d-none")
      $("#dompet").removeClass("d-none")

      $("#nama-content").addClass("d-none")
      $("#ref-content").addClass("d-none")
      $("#status-content").addClass("d-none")
      $("#tgl-content").removeClass("d-none")
      $("#kode-content").removeClass("d-none")
      $("#cat-content").removeClass("d-none")
      $("#nilai-content").removeClass("d-none")
      $("#dompet-content").removeClass("d-none")
    }
  }

  @action
  addItem() {
    $("#add-box").removeClass("d-none")
    $("#content-box").addClass("d-none")
  }
}
