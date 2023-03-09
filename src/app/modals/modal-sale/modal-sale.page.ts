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
 import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
 import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-modal-sale',
  templateUrl: './modal-sale.page.html',
  styleUrls: ['./modal-sale.page.scss'],
})
export class ModalSalePage implements OnInit {

  sale: any;

  share: string ;
  url: string;

  constructor(private helper: HelperService, private modal: ModalController, private iab: InAppBrowser, private socialSharing: SocialSharing) {}

  ngOnInit() {
    this.url =  this.sale.url_receipt;
    this.share = `Has realizado una ${this.sale.action} bajo el número de recibo ${this.sale.number_receipt}. Puede visualizar el mismo en el siguiente link ${this.url}. Recuerde que toda esta información se la enviamos a su correo ${this.sale.email}`;
  }

  sendShare() {
    this.socialSharing.share(this.share).then(() => {

    }).catch(() => {

    });
  }

  openUrl() {
    this.iab.create(this.url, '_system');
  }

  back(confirm: boolean = false) {
    this.modal.dismiss({
      confirm: confirm,
    });
  }

}
