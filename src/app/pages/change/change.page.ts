/**
 *
 * @fileoverview ChangePage
 *
 * @version 1.0
 *
 * @author Milan Gotera <milangotera@gmail.com>
 *
 */

 import { Component, OnInit } from '@angular/core';
 import { ApiService } from 'src/app/services/api/api.service';
 import { HelperService } from 'src/app/services/helper/helper.service';
 import { ModalController } from '@ionic/angular';
 import { ModalAlertPage } from '../../modals/modal-alert/modal-alert.page';

@Component({
  selector: 'app-change',
  templateUrl: './change.page.html',
  styleUrls: ['./change.page.scss'],
})
export class ChangePage implements OnInit {

  profile: any = JSON.parse(localStorage.getItem('profile'));

  load: boolean = true;

  jibs: any = [];

  form: any = {
    user_id: this.profile.id,
    method_id: null,
    amout_jib: null,
    amout_usd: null,
    method_type: 'card',
  };

  method: any = JSON.parse(localStorage.getItem('method')) || {
    id: 0,
    name: `Escoge una tarjeta`,
    icon: 'assets/icon/card.png',
    type: 'card'
  };

  min: number = 10;

  max: number = this.profile.balance_jib;

  usd: any = 0;

  amount: any = 0;

  change: any = this.profile.jib_rate;

  constructor(private api: ApiService, private helper: HelperService, private modal: ModalController) {}

  ngOnInit() {
    localStorage.removeItem('jib');
    this.loadData();
  }

  setAmount($event) {
    this.amount = $event.detail.value;
    this.usd    = (this.amount * this.change).toFixed(2);
  }

  loadData() {
    this.load = true;
    this.api
    .get(`user/profile/${this.profile.id}`)
      .then((response: any) => {
        this.load    = false;
        this.profile = response.profile;
      })
      .catch((danger: any) => {
        this.load = false;
      });
  }

  buyData() {
    this.load = true;
    this.api
      .post(`jibs/exchange`, {
        user_id: this.profile.id,
        amout_jib: this.amount
      })
      .then((response: any) => {
        this.load = false;
        this.helper.toast(response.message, 'Bien hecho');
        this.routes('balances');
      })
      .catch((danger: any) => {
        this.load = false;
        this.helper.toast(danger.error.message, 'Lo siento');
      });
  }

  async alert () {
    const modal = await this.modal.create({
      component: ModalAlertPage,
      cssClass: 'app-modal modal-alert',
      componentProps: {
        title: `Cambiar ${this.amount} JIBS`,
        message: `¿Confirmas tu cambio?`,
        icon: 'alert-outline',
        confirm: 'Confirmar',
        cancel: 'Cancelar'
      },
      backdropDismiss: false,
      swipeToClose: false,
      keyboardClose: false,
    });

    await modal.present();

    modal.onDidDismiss().then((success) => {
      console.log(success);
      if(success.data.confirm) {
        this.buyData();
      }
    });
  }

  routes(route){
    this.helper.routes(route);
  }

}
