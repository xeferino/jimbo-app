/**
 *
 * @fileoverview HelperService
 *
 * @version 1.0
 *
 * @author Milan Gotera <milangotera@gmail.com>
 *
 */

import { Injectable } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor(private nav: NavController, private toastController: ToastController) {}

  routes(page, option = 'root') {
    localStorage.setItem('route', page);
    if (option == 'forward') {
      this.nav.navigateForward(`/${page}`);
    }
    if (option == 'back') {
      this.nav.navigateBack(`/${page}`);
    }
    if (option == 'root') {
      this.nav.navigateRoot(`/${page}`);
    }
  }

  async toast(message, header, color: any = 'dark', position: any = 'bottom') {
    const toast = await this.toastController.create({
      message: message,
      header: header,
      duration: 3000,
      position: position,
      mode: 'ios',
      color: color,
    });
    toast.present();
  }

  money(value) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    });
    return formatter.format(value);
  }
}
