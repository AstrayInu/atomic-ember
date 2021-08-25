import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import $ from 'jquery'
import { computed, action, set } from '@ember/object';

export default class IndexController extends Controller {
  @service storage

  @computed('type')
  get viewType() {
    return this.type || this.storage.lget("viewType") || 'DOMPET'
  }

  @action
  addItem() {
    $("#add-box").removeClass("d-none")
    $("#content-box").addClass("d-none")
  }

  @action
  setStatus(val) {

  }

  @action
  changePage(val) {
    set(this, 'type', val)
    this.storage.lset("viewType", val)
  }
}
