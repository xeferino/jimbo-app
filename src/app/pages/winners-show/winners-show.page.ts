/**
 *
 * @fileoverview WinnersShowPage
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
import { ModalWinnersPage } from 'src/app/modals/modal-winners/modal-winners.page';

@Component({
  selector: 'app-winners-show',
  templateUrl: './winners-show.page.html',
  styleUrls: ['./winners-show.page.scss'],
})
export class WinnersShowPage implements OnInit {

  profile: any = JSON.parse(localStorage.getItem('profile'));

  raffles: any = JSON.parse(localStorage.getItem('raffle'));

  load: boolean = true;

  constructor(private api: ApiService, private helper: HelperService, private modal: ModalController) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.load = true;
    this.api
      .get(`raffles/winner/show/${this.raffles.id}`)
      .then((response: any) => {
        this.load = false;
        this.raffles = response.raffle;
        localStorage.setItem('raffle', JSON.stringify(this.raffles));
      })
      .catch((danger: any) => {
        this.load = false;
      });
  }

  async openWinner() {
    const modal = await this.modal.create({
      component: ModalWinnersPage,
      cssClass: 'app-modal modal-winners',
      componentProps: {
        raffles: this.raffles,
      },
      backdropDismiss: false,
      swipeToClose: false,
      keyboardClose: false,
    });

    await modal.present();

    modal.onDidDismiss().then((success) => {
     
    });
  }

  routes(route){
    this.helper.routes(route);
  }

}
