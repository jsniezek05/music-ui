import {inject} from 'aurelia-framework';
import {AppHttpClient} from './AppHttpClient';

@inject(AppHttpClient)
export class Auth {
  constructor(client){
    this.client = client;
  }

  isLoggedIn() {
    return this.client.get('/auth');
  }

  login(email, password) {
    return this.client.post('/login', {email, password});
  }
}

