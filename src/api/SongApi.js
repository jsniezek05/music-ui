import {inject} from 'aurelia-framework';
import {AppHttpClient} from './AppHttpClient';

@inject(AppHttpClient)
export class SongApi {

  constructor(client) {
    this.client = client;
    this.resource = '/song';
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

  getPlaylists(id) {
    return this.client.get(`${this.url}/${id}/playlists`)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }
}
