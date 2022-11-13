/**
 *
 * @fileoverview ModalSalePage
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
  selector: 'app-modal-sale',
  templateUrl: './modal-sale.page.html',
  styleUrls: ['./modal-sale.page.scss'],
})
export class ModalSalePage implements OnInit {

  sale: any;
  
  constructor(private helper: HelperService, private modal: ModalController) {}

  ngOnInit() {
    
  }

  back(confirm: boolean = false) {
    this.modal.dismiss({
      confirm: confirm,
    });
  }

}
