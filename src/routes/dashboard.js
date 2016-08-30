import {Redirect} from 'aurelia-router'
import {inject} from 'aurelia-framework'
import {Auth} from './../api/Auth'

@inject(Auth)
export class Dashboard {

  constructor(auth) {
    this.auth = auth;
  }

  // talk about async vs sync
}