import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import ENV from '../environment';

export class AppHttpClient extends HttpClient {
  constructor() {
    this.configure(config => {
      config
        .withBaseUrl(ENV.apiUrl)
        .withCredentials();
    });
  }
}
