import {inject} from 'aurelia-framework';
import {AppHttpClient} from './AppHttpClient';

@inject(AppHttpClient)
export class PlaylistApi {

  constructor(client) {
    this.client = client;
    this.resource = '/playlist';
  }

  _createSongModels(response) {
    return response.map(model => ModelFactory.newSong(model));
  }

  _createPlaylistModels(response) {
    return response.map(model => new Playlist(model));
  }

  getAll() {
    return this.client.get(this.url)
      .then(this._createPlaylistModels.bind(this))
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
