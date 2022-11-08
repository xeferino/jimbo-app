/**
 *
 * @fileoverview BalancesPage
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
  selector: 'app-balances',
  templateUrl: './balances.page.html',
  styleUrls: ['./balances.page.scss'],
})
export class BalancesPage implements OnInit {

  profile: any = JSON.parse(localStorage.getItem('profile'));

  load: boolean = true;

  balances: any = [];

  constructor(private api: ApiService, private helper: HelperService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.load = true;
    this.api
      .get(`user/balance/${this.profile.id}`)
      .then((response: any) => {
        this.load = false;
        this.balances    = response.balances;
        this.profile.usd = response.balance_usd;
        this.profile.jib = response.balance_jib;
        localStorage.setItem('profile', JSON.stringify(this.profile));
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
