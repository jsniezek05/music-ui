import {Router, RouterConfiguration} from 'aurelia-router';

export class App {
  router;

  configureRouter(config, router){
    config.title = 'App';
    config.map([
      { route: ['', 'browse'], name: 'browse', moduleId: './routes/browse', title: 'Browse'},
      { route: 'home', name: 'home', moduleId: './routes/home',   title: 'Home'},
    ]);

    this.router = router;
  }
}
