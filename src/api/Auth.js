import {inject} from 'aurelia-framework';
import {AppHttpClient} from './AppHttpClient';
import ENV from '../environment';

@inject(AppHttpClient)
export class Auth {
  constructor(){
    this.client = new HttpClient();
    this.client.configure(config => {
      config
        .withBaseUrl(ENV.apiUrl)
    });
  }

  isLoggedIn() {
    return this.client.get('/auth');
  }

  login(email, password) {
    return this.client.post('/login', {email, password});
  }
}

