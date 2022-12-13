/**
 *
 * @fileoverview ReferPage
 *
 * @version 1.0
 *
 * @author Milan Gotera <milangotera@gmail.com>
 *
 */

 import { Component, OnInit } from '@angular/core';
 import { Platform } from '@ionic/angular';
 import { HelperService } from 'src/app/services/helper/helper.service';
 import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
 import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-refer',
  templateUrl: './refer.page.html',
  styleUrls: ['./refer.page.scss'],
})
export class ReferPage implements OnInit {

  load: boolean = false;

  profile: any = JSON.parse(localStorage.getItem('profile'));

  share: string = `Regístrate en Jimbo usando mi código ${this.profile.code_referral ? this.profile.code_referral : 'SIN CÓDIGO'}`;

  constructor(private helper: HelperService, private iab: InAppBrowser, public platform: Platform, private socialSharing: SocialSharing) { }

  ngOnInit() {
  }

  openUrl() {
    this.platform.ready().then(() => {
      this.iab.create("https://www.techiediaries.com",'_blank');
    });
  }

  sendShare() {
    alert(true);
    this.platform.ready().then(() => {
      alert(2);
      this.socialSharing.shareViaEmail('Body', 'Subject', ['recipient@example.org']).then(() => {
        alert(1);
      }).catch(() => {
        alert(0);
      });
    });
  }

  shareViaTwitter () {
    this.iab.create(`https://wa.me/?text=${this.share}`, `_blank`);
  }

  shareViaFacebook () {
    this.iab.create(`https://wa.me/?text=${this.share}`, `_blank`);
  }

  shareViaInstagram () {
    this.iab.create(`https://wa.me/?text=${this.share}`, `_blank`);
  } 

  shareViaWhatsApp () {
    this.iab.create(`https://wa.me/?text=${this.share}`, `_blank`);
  }

  shareViaEmail () {
    window.open('https://forum.ionicframework.com/', '_system')
  }

  routes(route) {
    this.helper.routes(route);
  }

}
