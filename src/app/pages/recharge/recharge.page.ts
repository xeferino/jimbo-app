/**
 *
 * @fileoverview RechargePage
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
  selector: 'app-recharge',
  templateUrl: './recharge.page.html',
  styleUrls: ['./recharge.page.scss'],
})
export class RechargePage implements OnInit {

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

  constructor(private api: ApiService, private helper: HelperService, private modal: ModalController) {}

  ngOnInit() {
    if(this.method.id != 0 && this.method.type == 'card') {
      this.method = JSON.parse(localStorage.getItem('method'));
      this.form.method_id = this.method.id;
    } else {
      this.method = {
        id: 0,
        name: `Escoge una tarjeta`,
        icon: 'assets/icon/card.png',
        type: 'card'
      };
    }
    localStorage.removeItem('jib');
    this.loadData();
  }

  setAmout(item) {
    this.form.amout_jib = item.jib;
    this.form.amout_usd = item.usd;
  }

  setMethod() {
    localStorage.setItem('route_method', 'recharge');
    this.routes('methods');
  }

  loadData() {
    this.load = true;
    this.api
      .get(`jibs`)
      .then((response: any) => {
        this.load = false;
        this.jibs = response.jibs;
      })
      .catch((danger: any) => {
        this.load = false;
      });
  }

  buyData() {
    this.load = true;
    this.api
      .post(`jibs/recharge`, this.form)
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
        title: `Recargar ${this.form.amout_jib} JIBS`,
        message: `¿Confirmas tu compra?`,
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
