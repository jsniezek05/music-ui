import {bindable, inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Auth} from '../../api/Auth';

@inject(Auth, Router)
export class LoginView {
  email;
  password;
  error = '';

  constructor(auth, router) {
    this.auth = auth;
    this.router = router;
  }

  login(){
    this.error = '';
    this.auth.login(this.email, this.password)
      .then(user => {
        this.user = user;
        console.log(user);
        this.auth.currentUser = this.user;
        this.router.navigate('dashboard')
      })
      .catch(error => {
        console.log(error);
        this.error = 'Error';
      })
  }
}

