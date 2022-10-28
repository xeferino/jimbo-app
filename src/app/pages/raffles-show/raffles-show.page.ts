/**
 *
 * @fileoverview RafflesShowPage
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
  selector: 'app-raffles-show',
  templateUrl: './raffles-show.page.html',
  styleUrls: ['./raffles-show.page.scss'],
})
export class RafflesShowPage implements OnInit {

  profile: any = JSON.parse(localStorage.getItem('profile'));

  raffles: any = JSON.parse(localStorage.getItem('raffle'));

  load: boolean = true;

  form: any = {
    raffle_id: this.raffles.id,
    ticket_id: null,
    promotion_id: null,
  };

  constructor(private api: ApiService, private helper: HelperService, private modal: ModalController) {}

  ngOnInit() {
    this.loadData();
  }

  setData(tickets, promotions) {
    this.form.ticket_id    = tickets;
    this.form.promotion_id = promotions;
  }

  buyData() {
    if(!this.profile.email_verified_at) {
      this.verified();
    }
  }

  saleData() {

  }

  loadData() {
    this.load = true;
    this.api
      .get(`raffles/detail/${this.raffles.id}`)
      .then((response: any) => {
        this.load = false;
        this.raffles = response.raflle;
      })
      .catch((danger: any) => {
        this.load = false;
      });
  }

  openRaffles(item){
    localStorage.setItem('raffle', JSON.stringify(item));
    this.routes(`raffles/${item.id}`);
  }

  async verified() {
    const modal = await this.modal.create({
      component: ModalAlertPage,
      cssClass: 'app-modal modal-alert',
      componentProps: {
        title: 'Verifica tu cuenta',
        message: 'Parece que tu cuenta no ha sido verificada',
        icon: 'alert-outline',
        confirm: 'Verificar',
        cancel: 'Cerrar'
      },
      backdropDismiss: false,
      swipeToClose: false,
      keyboardClose: false,
    });

    await modal.present();

    modal.onDidDismiss().then((success) => {
      console.log(success);
      if(success.data.confirm) {
        this.routes('profile/edit')
      }
    });
  }

  routes(route){
    this.helper.routes(route);
  }

}
