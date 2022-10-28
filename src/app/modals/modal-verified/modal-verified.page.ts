/**
 *
 * @fileoverview ModalVerifiedPage
 *
 * @version 1.0
 *
 * @author Milan Gotera <milangotera@gmail.com>
 *
 */

 import { Component, OnInit } from '@angular/core';
 import { ModalController } from '@ionic/angular';
 import { HelperService } from 'src/app/services/helper/helper.service';
 import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-modal-verified',
  templateUrl: './modal-verified.page.html',
  styleUrls: ['./modal-verified.page.scss'],
})
export class ModalVerifiedPage implements OnInit {

  message: string;

  code: string = null;
  
  constructor(private helper: HelperService, private modal: ModalController, private api: ApiService) {}

  ngOnInit() {
    this.helper.toast(this.message, 'Bien hecho');
  }

  back(confirm: boolean = false) {
    this.modal.dismiss({
      code: this.code,
      confirm: confirm,
    });
  }

}
