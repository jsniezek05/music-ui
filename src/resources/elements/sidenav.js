import {bindable, inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class Sidenav {
  @bindable value;
  playlists = [
    { icon: 'library_music', name: 'Playlist 1' },
    { icon: 'library_music', name: 'Playlist 1' },
    { icon: 'library_music', name: 'Playlist 1' },
    { icon: 'library_music', name: 'Playlist 1' }
  ];

  constructor(router) {
    this.router = router;
    console.log(this.router);
  }

  valueChanged(newValue, oldValue) {

  }
}

