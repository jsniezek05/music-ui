import {Router, RouterConfiguration} from 'aurelia-router';

export class App {
  //router;
  //
  //configureRouter(config, router){
  //  config.title = 'App';
  //  config.map([
  //    { route: ['', 'browse'], name: 'browse', moduleId: './routes/browse', title: 'Browse', icon: 'language', nav: true },
  //    { route: 'home', name: 'home', moduleId: './routes/home',   title: 'Home', icon: 'assignment_ind', nav: true }
  //  ]);
  //
  //  this.router = router;
  //}

  toggleOptions() {
    this.showMenu = !this.showMenu;
  }
}
