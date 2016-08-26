import {Auth} from './api/Auth';
import {inject} from 'aurelia-framework';
import {Playlist} from './model/Playlist';

Playlist.getAll()
  .then(res => {
    console.log(res);
    let playlist = res[0];
    console.log(playlist.model.name);
    playlist.model.name = 'new name';
    playlist.save()
      .then(res => {
        console.log(res)
      });

  });

@inject(Auth, Playlist)
export class App {
  email;
  password;
  playlist = [];

  constructor(auth) {
    this.auth = auth;
    this.auth.isLoggedIn()
      .then(response => {
        console.log(response)
      });
    this.loadPlaylist();
  }

  loadPlaylist(){
    Playlist.getAll()
      .then(playlist => {
        this.playlist = playlist;
        console.log(this.playlist);
      });
  }


  login(){
    this.auth.login(this.email, this.password)
      .then(response => {
        this.firstName = response.content.firstName;
        this.lastName = response.content.lastName;
        this.fullName = this.firstName + ' ' + this.lastName;
      });
  }
}
