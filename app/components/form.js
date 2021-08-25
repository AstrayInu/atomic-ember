import Component from '@glimmer/component';
import $ from 'jquery'
import { inject as service } from '@ember/service';
import { computed, action, set } from '@ember/object';

export default class FormComponent extends Component {
  @service storage

  @computed('isValidName')
  get isDisabled() {
    return !this.isValidName
  }

  @action
  inputName() {
    set(this, 'isValidName', this.name.length>4?true:false)
  }

  @action
  closeAdd() {
    $("#add-box").addClass("d-none")
    $("#content-box").removeClass("d-none")
  }
}
