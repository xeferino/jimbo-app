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
 import { HelperService } from 'src/app/services/helper/helper.service';
 import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

@Component({
  selector: 'app-refer',
  templateUrl: './refer.page.html',
  styleUrls: ['./refer.page.scss'],
})
export class ReferPage implements OnInit {

  load: boolean = false;

  profile: any = JSON.parse(localStorage.getItem('profile'));

  constructor(private helper: HelperService, private socialSharing: SocialSharing) { }

  ngOnInit() {
  }

  async copyCode() {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(this.profile.code_referral ? this.profile.code_referral : 'SIN CÓDIGO');
        this.helper.toast('Se ha copiado en el porta papels', 'Bien hecho');
      } catch (err) {}
    }
  }

  shareCode(){
    this.socialSharing.share(`Regístrate en Jimbo usando mi código ${this.profile.code_referral ? this.profile.code_referral : 'SIN CÓDIGO'}`).then(function() {
      console.log('Successful share');
    }).catch(function(error) {
      console.log('Error sharing:', error)
    });
  }

  routes(route) {
    this.helper.routes(route);
  }

}
