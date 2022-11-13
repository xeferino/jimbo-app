/**
 *
 * @fileoverview ProfileAccountPage
 *
 * @version 1.0
 *
 * @author Milan Gotera <milangotera@gmail.com>
 *
 */

import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { HelperService } from 'src/app/services/helper/helper.service';
import { ApiService } from 'src/app/services/api/api.service';
import { Chart, registerables } from 'chart.js';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ModalController } from '@ionic/angular';
import { ModalAlertPage } from '../../modals/modal-alert/modal-alert.page';

@Component({
  selector: 'app-profile-account',
  templateUrl: './profile-account.page.html',
  styleUrls: ['./profile-account.page.scss'],
})
export class ProfileAccountPage implements OnInit {

  @ViewChild('mySalesChart') private mySalesChart: ElementRef;

  yourSales: any;
  mySales: any;

  grafics: any;

  profile: any = JSON.parse(localStorage.getItem('profile'));
  
  load: boolean = false;

  constructor(private helper: HelperService, private auth: AuthService, private api: ApiService, private modal: ModalController) { 
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.loadData();
    this.mySalesChartCreate ();
  }

  loadData() {
    this.load = true;
    this.api
      .get(`user/profile/${this.profile.id}`)
      .then((response: any) => {
        this.load = false;
        this.profile = response.profile;
        localStorage.setItem('profile', JSON.stringify(this.profile));
      })
      .catch((danger: any) => {
        this.load = false;
        this.helper.toast(danger.error.message, 'Lo siento');
      });
  }

  mySalesChartCreate () {

    this.api
      .get( this.profile.role == 'seller' ? `user/sales/graphics/${this.profile.id}` : `user/shoppings/graphics/${this.profile.id}`)
      .then((response: any) => {
        this.load = false;
        this.grafics = response.grafics;
        this.mySales = new Chart(this.mySalesChart.nativeElement, {
          type: 'line',
          data: {
            labels: this.grafics.sales.labels,
            datasets: [{
              label: this.profile.role == 'seller' ? `Ventas del mes` : `Compras del mes`,
              data: this.grafics.sales.data,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }]
          }
        });
      })
      .catch((danger: any) => {
        this.load = false;
        this.helper.toast(danger.error.message, 'Lo siento');
      });
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
