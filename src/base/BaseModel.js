import {HttpClient} from 'aurelia-http-client';
import Env from '../environment';

export class BaseModel {

  constructor(model) {
    this.client = new HttpClient();
    this.client.configure(config => {
      config.withBaseUrl(Env.apiEndpoint);
    });
    this.model = model;
  }

  path = '';

  save() {
    let method = this.model.id ? 'put' : 'post';
    let path = this.model.id ? `${this.path}/${this.model.id}` : this.path;
    return this.client[method](path, this.model)
      .then(res => {
        return this;
      });
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