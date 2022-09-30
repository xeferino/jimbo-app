/**
 *
 * @fileoverview SettingPage
 *
 * @version 1.0
 *
 * @author Milan Gotera <milangotera@gmail.com>
 *
 */

import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper/helper.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';
import { ModalAlertPage } from '../../modals/modal-alert/modal-alert.page';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  load: boolean = false;

  constructor(private helper: HelperService, private auth: AuthService, private api: ApiService, private modal: ModalController) { }

  ngOnInit() {
  }

  routes(route: string) { this.helper.routes(route); }

  async logout() {
    const modal = await this.modal.create({
      component: ModalAlertPage,
      cssClass: 'app-modal modal-alert',
      componentProps: {
        title: 'Cerrar sesión',
        message: 'Está seguro que desea terminar la sesión',
        icon: 'log-out-outline',
        confirm: 'Cerrar sesion',
        cancel: 'Continuar'
      },
      backdropDismiss: false,
      swipeToClose: false,
      keyboardClose: false,
    });

    await modal.present();

    modal.onDidDismiss().then((success) => {
      console.log(success);
      if(success.data.confirm) {
        this.load = true;
        setTimeout(() => {
          this.auth.logout();
          this.routes('welcome');
          this.helper.toast('Se ha cerrado la sesión correctamente', 'Hasta luego');
        }, 1000);
      }
    });
  }

}
