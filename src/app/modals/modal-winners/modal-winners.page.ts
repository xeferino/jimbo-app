/**
 *
 * @fileoverview ModalWinnersPage
 *
 * @version 1.0
 *
 * @author Milan Gotera <milangotera@gmail.com>
 *
 */

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-modal-winners',
  templateUrl: './modal-winners.page.html',
  styleUrls: ['./modal-winners.page.scss'],
})
export class ModalWinnersPage implements OnInit {

  raffles: any = JSON.parse(localStorage.getItem('raffle'));

  load: boolean = false;

  constructor(private helper: HelperService, private modal: ModalController) {}

  ngOnInit() {
  }

  back() {
    this.modal.dismiss();
  }

}
