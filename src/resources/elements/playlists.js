import {bindable, inject} from 'aurelia-framework';
import {Playlist} from '../../model/Playlist';
import {Auth} from '../../api/Auth';

@inject(Playlist, Auth)
export class Playlists {
  playlists = [];
  @bindable newPlaylist = '';
  @bindable playlist;
  @bindable objPlaylist = {};

  constructor(playlist, auth) {
    this.playlist = playlist;
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
    Playlist.getAll()
      .then(playlists => {
        this.playlists = playlists;
        console.log(this.playlists);
      });
  }
}

