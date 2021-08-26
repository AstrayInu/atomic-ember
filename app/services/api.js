import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { Promise as EmberPromise } from 'rsvp';

export default class ApiService extends Service {
  @service config

  getData(type, params) {
    let url = `${this.config.appenv.API_ENDPOINT}/public/atomic?type=${type}`
    if(params) {
      let q = params.q ? params.q : null
        , stats = params.stats ? params.stats : null
      url += stats ? `&stats=${stats}` : '' 
      url += q ? `&q=${q}` : '' 
    }
    return new EmberPromise((resolve, reject) => {
      $.ajax({
        method: 'GET',
        contentType: 'application/json',
        url
      }).then((response) => {
        resolve(response)
      }, (reason) => {
        reject(reason);
      });
    });
  }

  createData(data) {
    return new EmberPromise((resolve, reject) => {
      $.ajax({
        method: 'POST',
        contentType: 'application/json',
        url: `${this.config.appenv.API_ENDPOINT}/public/atomic`,
        data: JSON.stringify(data)
      }).then((response) => {
        resolve(response)
      }, (reason) => {
        reject(reason);
      });
    });
  }

  updateData(data) {
    return new EmberPromise((resolve, reject) => {
      $.ajax({
        method: 'PUT',
        contentType: 'application/json',
        url: `${this.config.appenv.API_ENDPOINT}/public/atomic`,
        data: JSON.stringify(data)
      }).then((response) => {
        resolve(response)
      }, (reason) => {
        reject(reason);
      });
    });
  }

  changeStatus(data) {
    return new EmberPromise((resolve, reject) => {
      $.ajax({
        method: 'PUT',
        contentType: 'application/json',
        url: `${this.config.appenv.API_ENDPOINT}/public/atomic/update-status`,
        data: JSON.stringify(data)
      }).then((response) => {
        resolve(response)
      }, (reason) => {
        reject(reason);
      });
    });
  }
}
