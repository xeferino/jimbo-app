/**
 *
 * @fileoverview BeadsRequestPage
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
  selector: 'app-beads-request',
  templateUrl: './beads-request.page.html',
  styleUrls: ['./beads-request.page.scss'],
})
export class BeadsRequestPage implements OnInit {

  profile: any = JSON.parse(localStorage.getItem('profile'));

  load: boolean = true;

  accounts: any = [];

  requests: any = [];

  constructor(private api: ApiService, private helper: HelperService) {}

  ngOnInit() {
    this.loadData();
  }

  setData(tickets, promotions) {
    
  }

  setAccount(item) {
    localStorage.setItem('bead', JSON.stringify(item));
    this.routes(`beads/${item.id}/show`);
  }

  loadData() {
    this.load = true;
    this.api
      .get(`cash/request/${this.profile.id}`)
      .then((response: any) => {
        this.load = false;
        this.requests = response.requests;
      })
      .catch((danger: any) => {
        this.load = false;
      });
  }

  back () {
    this.routes(`profile/account`);
  }

  routes(route){
    this.helper.routes(route);
  }

}
