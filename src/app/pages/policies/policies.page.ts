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

@Component({
  selector: 'app-policies',
  templateUrl: './policies.page.html',
  styleUrls: ['./policies.page.scss'],
})
export class PoliciesPage implements OnInit {

  load: boolean = false;

  legality: any;

  profile: any = JSON.parse(localStorage.getItem('profile')) || null;

  constructor(private api: ApiService, private helper: HelperService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.load = true;
    this.api
      .get(`terms-conditions`)
      .then((response: any) => {
        this.load = false;
        this.legality = response.legality;
      })
      .catch((danger: any) => {
        this.load = false;
      });
  }

  back() {
    if(!this.profile){
      this.routes('signup');
    } else {
      this.routes('profile/account');
    }
  }

  routes(route) {
    this.helper.routes(route);
  }

}
