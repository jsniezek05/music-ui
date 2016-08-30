import {HttpClient} from 'aurelia-http-client';
import Env from '../environment';

export class Auth {
  constructor(){
    this.client = new HttpClient();
    this.client.configure(config => {
      config
        .withBaseUrl(Env.apiEndpoint)
    });
  }

  isLoggedIn(){
    return this.client.get('/auth');
  }

  login(email, password){
    return this.client.post('/login', { email, password });
  }
}

