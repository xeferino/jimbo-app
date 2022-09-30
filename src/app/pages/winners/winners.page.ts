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

  winners: any = [0, 1, 2, 3, 4, 5, 6, 7];

  load: boolean = true;

  constructor(private api: ApiService, private helper: HelperService) {}

  ngOnInit() {
    //this.loadData();
    setTimeout(() => {
      this.load = false;
      this.helper.toast('Se están mostrando datos de prueba', 'En construcción');
    }, 3000);
  }

  loadData() {
    this.load = true;
    this.api
      .get(`winners`)
      .then((response: any) => {
        this.load = false;
        this.winners = response.winners;
      })
      .catch((danger: any) => {
        this.load = false;
      });
  }
}