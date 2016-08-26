import {BaseModel} from '../base/BaseModel';
import {HttpClient} from 'aurelia-http-client';
import Env from '../environment';

export class Song extends BaseModel {

  static getAll() {
    let client = new HttpClient();
    client.configure(config => {
      config.withBaseUrl(Env.apiEndpoint);
    });
    return client.get('/song')
      .then(res => {
        return res.map(model => {
          return new Song(model);
        });
      });
  }

  path = '/song';
}