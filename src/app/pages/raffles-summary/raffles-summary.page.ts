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
 import { ModalCountriesPage } from '../../modals/modal-countries/modal-countries.page';

@Component({
  selector: 'app-raffles-summary',
  templateUrl: './raffles-summary.page.html',
  styleUrls: ['./raffles-summary.page.scss'],
})
export class RafflesSummaryPage implements OnInit {

  profile: any = JSON.parse(localStorage.getItem('profile'));

  raffles: any = JSON.parse(localStorage.getItem('raffle'));

  ticket: any = JSON.parse(localStorage.getItem('ticket'));

  operation: any = localStorage.getItem('operation') || 1;

  load: boolean = true;

  method: any = JSON.parse(localStorage.getItem('method')) || {
    id: 0,
    name: `${this.profile.jib}`,
    icon: 'assets/icon/jib.png',
    type: 'jib'
  };

  errors: any = {};

  country: any = this.profile.country;

  form: any = {
    name: this.operation == 1 ? this.profile.names : null,
    email: this.operation == 1 ?this.profile.emails : null,
    dni: this.operation == 1 ?this.profile.dnis : null,
    phone: this.operation == 1 ?this.profile.phones : null,
    address: null,
    seller_id: this.profile.id,
    ticket_id: this.ticket.ticket_id,
    raffle_id: this.raffles.id,
    user_id: this.profile.id,
    method_id: this.method.id,
    method_type: this.method.type,
    country_id: this.country.id,
    operation: this.operation,
  };

  constructor(private api: ApiService, private helper: HelperService, private modal: ModalController) {}

  ngOnInit() {
    localStorage.removeItem('route_method');
    this.loadData();
  }

  setMethod() {
    localStorage.setItem('route_method', 'summary');
    this.routes('methods');
  }

  setData(tickets, promotions) {
    
  }

  saleData() {

  }

  buyData() {
    this.load = true;
    this.api
      .post(`sales/payment`, this.form)
      .then((response: any) => {
        this.load = false;
        this.sale(response.details);
        localStorage.removeItem('sale');
        localStorage.removeItem('raffle');
        localStorage.removeItem('ticket');
        localStorage.removeItem('method');
      })
      .catch((danger: any) => {
        this.load = false;
        this.helper.toast(danger.error.message, 'Lo siento');
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

  validate(input) {}

  async alert () {
    const modal = await this.modal.create({
      component: ModalAlertPage,
      cssClass: 'app-modal modal-alert',
      componentProps: {
        title: this.profile.seller ? 'Confirma tu venta' : 'Confirma tu comprar' ,
        message: this.profile.seller ? `Estás a punto de realizar una venta de ${this.raffles.promotion.price}` : `Estás a punto de realizar una comprar de ${this.raffles.promotion.price}`,
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

  async openCountries() {
    const modal = await this.modal.create({
      component: ModalCountriesPage,
      cssClass: 'app-modal modal-countries',
      componentProps: {},
      backdropDismiss: false,
      swipeToClose: false,
      keyboardClose: false,
    });

    await modal.present();

    modal.onDidDismiss().then((success) => {
      this.country = success.data.country;
      this.form.country_id = success.data.country.id;
    });
  }

  back () {
    this.routes(`raffles/${this.raffles.id}`);
  }

  routes(route){
    this.helper.routes(route);
  }


}
