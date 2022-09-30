/**
 *
 * @fileoverview ModalLogoutPage
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
  selector: 'app-modal-alert',
  templateUrl: './modal-alert.page.html',
  styleUrls: ['./modal-alert.page.scss'],
})
export class ModalAlertPage implements OnInit {

  title: string;
  message: string;
  icon: string;
  confirm: string;
  cancel: string;
  
  constructor(private helper: HelperService, private modal: ModalController) {}

  ngOnInit() {
  }

  back(confirm: boolean = false) {
    this.modal.dismiss({
      confirm: confirm,
    });
  }

}

