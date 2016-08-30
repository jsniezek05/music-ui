import {Router, RouterConfiguration} from 'aurelia-router';

export class App {
  router;

  configureRouter(config, router){
    config.title = 'App';
    config.map([
      { route: ['', 'dashboard'], name: 'dashboard', moduleId: './routes/dashboard',   title: 'Dashboard'},
      { route: 'login', name: 'login', moduleId: './routes/login', title: 'Login'},
    ]);

    this.router = router;
  }
}
