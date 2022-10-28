/**
 *
 * @fileoverview RafflesSummaryPage
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
 import { ModalSalePage } from '../../modals/modal-sale/modal-sale.page';

@Component({
  selector: 'app-raffles-summary',
  templateUrl: './raffles-summary.page.html',
  styleUrls: ['./raffles-summary.page.scss'],
})
export class RafflesSummaryPage implements OnInit {

  profile: any = JSON.parse(localStorage.getItem('profile'));

  raffles: any = JSON.parse(localStorage.getItem('raffle'));

  ticket: any = JSON.parse(localStorage.getItem('ticket'));

  load: boolean = true;

  method: any = JSON.parse(localStorage.getItem('method')) || {
    id: 0,
    name: `${this.profile.jib} JIB`,
    icon: 'assets/icon/jib.png',
    type: 'jib'
  };

  constructor(private api: ApiService, private helper: HelperService, private modal: ModalController) {}

  ngOnInit() {
    this.loadData();
  }

  setData(tickets, promotions) {
    
  }

  saleData() {

  }

  buyData() {
    this.load = true;
    this.api
      .post(`sales/payment`, {
        ticket_id: this.ticket.ticket_id,
        raffle_id: this.raffles.id,
        user_id: this.profile.id,
        method_id: this.method.id,
        method_type: this.method.type,
        country_id: this.profile.country.id,
      })
      .then((response: any) => {
        this.load = false;
        this.sale(response.details);
        localStorage.removeItem('details');
        localStorage.removeItem('raffle');
        localStorage.removeItem('ticket');
        localStorage.removeItem('method');
      })
      .catch((danger: any) => {
        this.load = false;
      });
  }

  loadData() {
    this.load = true;
    this.api
      .post(`raffles/ticket`, this.ticket)
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

  async alert () {
    const modal = await this.modal.create({
      component: ModalAlertPage,
      cssClass: 'app-modal modal-alert',
      componentProps: {
        title: 'Confirma tu compra',
        message: `Estás a punto de realizar una compra de ${this.raffles.promotion.price}`,
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

  async sale(sale) {
    const modal = await this.modal.create({
      component: ModalSalePage,
      cssClass: 'app-modal modal-sale',
      componentProps: {
        sale: sale,
      },
      backdropDismiss: false,
      swipeToClose: false,
      keyboardClose: false,
    });

    await modal.present();

    modal.onDidDismiss().then((success) => {
      this.routes('home');
    });
  }

  back () {
    this.routes(`raffles/${this.raffles.id}`);
  }

  routes(route){
    this.helper.routes(route);
  }


}
