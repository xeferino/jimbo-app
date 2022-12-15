/**
 *
 * @fileoverview PoliciesPage
 *
 * @version 1.0
 *
 * @author Milan Gotera <milangotera@gmail.com>
 *
 */

 import { Component, OnInit } from '@angular/core';
 import { ApiService } from 'src/app/services/api/api.service';
 import { HelperService } from 'src/app/services/helper/helper.service';
 import { ModalAlertPage } from '../../modals/modal-alert/modal-alert.page';
 import { ModalController } from '@ionic/angular';
 import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.page.html',
  styleUrls: ['./policies.page.scss'],
})
export class PoliciesPage implements OnInit {

  load: boolean = false;

  legality: any;
  termins: any;

  view: number = 1;

  profile: any = JSON.parse(localStorage.getItem('profile')) || null;

  isModal: any = localStorage.getItem('isModal') || false;

  constructor(private api: ApiService, private helper: HelperService, private modal: ModalController, private platform: Platform) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.back();
    });
  }

  ngOnInit() {
    this.loadData();
  }

  setView(view: number) {
    this.view = view;
  }

  loadData() {
    this.load = true;
    this.api
      .get(`terms-conditions`)
      .then((response: any) => {
        this.load = false;
        this.legality = response.legality;
        this.termins = response.termins;
      })
      .catch((danger: any) => {
        this.load = false;
      });
  }

  back() {
    if(this.isModal) {
      this.modal.dismiss();
    }
    else if(!this.profile){
      this.routes('signup');
    } else {
      this.routes('profile/account');
    }
  }

  routes(route) {
    this.helper.routes(route);
  }

}
