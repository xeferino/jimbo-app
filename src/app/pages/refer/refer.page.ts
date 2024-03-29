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

  share: string = `Regístrate en https://play.google.com/store/apps/details?id=com.jimbosorteos.app usando mi código ${this.profile.code_referral ? this.profile.code_referral : 'SIN CÓDIGO'}`;

  constructor(private helper: HelperService, private iab: InAppBrowser, public platform: Platform, private socialSharing: SocialSharing) { }

  ngOnInit() {
  }

  openUrl() {
    this.platform.ready().then(() => {
      this.iab.create("https://www.techiediaries.com", '_system');
    });
  }

  sendShare() {
    this.platform.ready().then(() => {
      this.socialSharing.share(this.share).then(() => {

      }).catch(() => {

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

  back() {
    this.helper.back();
  }

  routes(route) {
    this.helper.routes(route);
  }

}
