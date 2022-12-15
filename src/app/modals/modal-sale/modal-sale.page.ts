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

  share: string = `He realizado una compra en https://jimbosorteos.com, te invito a que te animes tu también.`;
  
  constructor(private helper: HelperService, private modal: ModalController, private iab: InAppBrowser, private socialSharing: SocialSharing) {}

  ngOnInit() {
    
  }

  sendShare() {
    this.socialSharing.share(this.share).then(() => {
        
    }).catch(() => {
      
    });
  }

  openUrl() {
    this.iab.create("https://www.techiediaries.com", '_system');
  }

  back(confirm: boolean = false) {
    this.modal.dismiss({
      confirm: confirm,
    });
  }

}
