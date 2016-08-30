import {inject} from 'aurelia-framework';
import {AppHttpClient} from './AppHttpClient';

@inject(AppHttpClient)
export class PlaylistApi {

  constructor(client) {
    this.client = client;
    this.resource = '/playlist';
  }

  getAll() {
    return this.client.get(this.url)
      .then(response => console.log(response))
      .catch(err => console.log(err));
  }

  create(newPlaylist) {
    return this.client.post(this.url, newPlaylist)
      .then(response => console.log(response))
      .catch(err => console.log(err));
  }

  getSongs(id) {
    return this.client.get(`${this.url}/${id}/songs`)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }
}
