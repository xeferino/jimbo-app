/**
 *
 * @fileoverview AuthService
 *
 * @version 1.0
 *
 * @author Milan Gotera <milangotera@gmail.com>
 *
 */

import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authState = new BehaviorSubject(false);

  constructor(private nav: NavController) {
    this.ifLoggedIn();
  }

  ifLoggedIn() {
    if (localStorage.getItem('profile')) {
      this.authState.next(true);
    }
  }

  token(token) {
    localStorage.setItem('token', token);
    this.authState.next(true);
  }

  profile(profile) {
    localStorage.setItem('profile', JSON.stringify(profile));
    this.authState.next(true);
  }

  login() {
    const route: string = 'home';
    this.nav.navigateRoot(route);
  }

  logout() {
    localStorage.clear();
    this.authState.next(false);
  }

  isAuthenticated() {
    const authState: boolean = this.authState.value;
    if (!authState) {
      this.nav.navigateForward('welcome');
    }
    return authState;
  }
}
