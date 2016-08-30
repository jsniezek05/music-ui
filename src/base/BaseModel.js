import {inject} from 'aurelia-framework';
import {AppHttpClient} from '../api/AppHttpClient';
import Env from '../environment';

@inject(AppHttpClient)
export class BaseModel {
  path = '';

  constructor(client) {
    this.client = client;
  }

  /**
   * Sends a POST|PUT request to update or create a new model
   *
   * @returns {Promise.<T>|*}
   */
  save() {
    let method = this.model.id ? 'put' : 'post';
    let path = this.model.id ? `${this.path}/${this.model.id}` : this.path;
    return this.client[method](path, this.model)
      .then(res => this);
  }

  /**
   * Destroy model
   *
   * @returns {Promise}
   */
  destroy() {
    if(!this.model.id) {
      return Promise.reject('Trying to destroy model with no id');
    }
    return this.client.delete(`${this.path}/${this.model.id}`);
  }
}
