/**
 *
 * @fileoverview RetirePage
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
  selector: 'app-retire',
  templateUrl: './retire.page.html',
  styleUrls: ['./retire.page.scss'],
})
export class RetirePage implements OnInit {

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

  max: number = this.profile.balance_usd;

  usd: any = 0;

  amount: any = 0;

  change: any = this.profile.jib_rate;

  account: any = null;

  accounts: any = [];

  account_load: boolean = false;

  constructor(private api: ApiService, private helper: HelperService, private modal: ModalController) {}

  ngOnInit() {
    localStorage.removeItem('jib');
    this.loadData();
    this.loadAccount();
  }

  setAmount($event) {
    this.amount = $event.detail.value;
  }

  setAccount(item) {
    this.account = item;
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

  loadAccount() {
    this.account_load = true;
    this.api
    .get(`user/accounts/all/${this.profile.id}`)
      .then((response: any) => {
        this.account_load    = false;
        this.accounts = response.accounts;
      })
      .catch((danger: any) => {
        this.account_load = false;
      });
  }

  buyData() {
    this.load = true;
    this.api
      .post(`cash/request`, {
        user_id: this.profile.id,
        amount: this.amount,
        account_user_id: this.account
      })
      .then((response: any) => {
        this.load = false;
        this.helper.toast(response.message, 'Bien hecho');
        this.routes('beads-request');
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
        title: `Retirar ${this.amount} USD`,
        message: `¿Confirmas tu retiro?`,
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
