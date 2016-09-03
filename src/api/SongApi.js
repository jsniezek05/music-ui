import {inject} from 'aurelia-framework';
import {AppHttpClient} from './AppHttpClient';

@inject(AppHttpClient)
export class SongApi {

  constructor(client) {
    this.client = client;
    this.resource = '/song';
  }

  _createSongModels(response) {
    return response.map(model => ModelFactory.newSong(model));
  }

  _createPlaylistModels(response) {
    return response.map(model => new Playlist(model));
  }

  getAll() {
    return this.client.get(this.url)
      .then(this._createSongModels.bind(this))
      .catch(err => console.log(err));
  }

  create(newPlaylist) {
    return this.client.post(this.url, newPlaylist)
      .then(this._createSongModels.bind(this))
      .catch(err => console.log(err));
  }

  getPlaylists(id) {
    return this.client.get(`${this.url}/${id}/playlists`)
      .then(this._createPlaylistModels.bind(this))
      .catch(err => console.log(err));
  }
}
