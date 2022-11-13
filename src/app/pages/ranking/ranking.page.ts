/**
 *
 * @fileoverview RankingPage
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
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
})
export class RankingPage implements OnInit {

  profile: any = JSON.parse(localStorage.getItem('profile'));

  load: boolean = true;

  balances: any = [];

  sellers: any = [];

  constructor(private api: ApiService, private helper: HelperService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.load = true;
    this.api
      .get(`sales/sellers/rankings`)
      .then((response: any) => {
        this.load = false;
        this.sellers    = response.sellers;
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