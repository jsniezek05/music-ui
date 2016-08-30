import {BaseModel} from '../base/BaseModel';
import {HttpClient} from 'aurelia-http-client';
import Env from '../environment';

export class Playlist extends BaseModel {

  static getAll() {
    let client = new HttpClient();
    client.configure(config => {
      config.withBaseUrl(Env.apiEndpoint);
    });
    return client.get('/playlist')
      .then(res => {
        return res.content.map(model => {
          return new Playlist(model);
        });
      });
  }


  path = '/playlist';
}