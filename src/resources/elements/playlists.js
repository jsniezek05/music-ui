import {bindable, inject} from 'aurelia-framework';
import {PlaylistApi} from '../../api/PlaylistApi';
import {Auth} from '../../api/Auth';

@inject(PlaylistApi, Auth)
export class Playlists {
  playlists = [];
  @bindable newPlaylist = '';
  @bindable playlist;
  @bindable objPlaylist = {};

  constructor(playlistApi, auth) {
    this.playlistApi = playlistApi;
    this.auth = auth;
    this.user = this.auth.currentUser;
    this.loadPlaylists();
  }


  //Below is what I've been trying to use.
  // addPlaylist(newPlaylist){
  //   this.newPlaylist = newPlaylist;
  //   console.log(this.user.content.id);
  //   this.objPlaylist.name = this.newPlaylist;
  //   this.objPlaylist.id = this.user.content.id;
  //   this.playlist.save(this.objPlaylist);
  // }

  loadPlaylists() {
    this.playlistApi.getAll()
      .then(playlists => {
        this.playlists = playlists;
        console.log(this.playlists);
      });
  }
}

