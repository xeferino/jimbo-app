/**
 *
 * @fileoverview WinnersPage
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
  selector: 'app-winners',
  templateUrl: './winners.page.html',
  styleUrls: ['./winners.page.scss'],
})
export class WinnersPage implements OnInit {

  winners: any = [];

  load: boolean = true;

  show: number = 0;

  constructor(private api: ApiService, private helper: HelperService) {}

  ngOnInit() {
    this.loadData();
  }

  setWinner(item) {
    this.show = item.id;
  }

  routes(route){
    this.helper.routes(route);
  }

  loadData() {
    this.load = true;
    this.api
      .get(`raffles/winners`)
      .then((response: any) => {
        this.load = false;
        this.winners = response.raffles;
      })
      .catch((danger: any) => {
        this.load = false;
      });
  }
}