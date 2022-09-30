/**
 *
 * @fileoverview RafflesComponent
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
  selector: 'app-raffles',
  templateUrl: './raffles.component.html',
  styleUrls: ['./raffles.component.scss'],
})
export class RafflesComponent implements OnInit {

  raffles: any = [0, 1, 2, 3, 4, 5, 6, 7];

  load: boolean = true;

  constructor(private api: ApiService, private helper: HelperService) {}

  ngOnInit() {
    //this.loadData();
    setTimeout(() => {
      this.load = false;
      this.helper.toast('Se están mostrando datos de prueba', 'Sorteos en construcción');
    }, 3000);
  }

  loadData() {
    this.load = true;
    this.api
      .get(`raffles`)
      .then((response: any) => {
        this.load = false;
        this.raffles = response.raffles;
      })
      .catch((danger: any) => {
        this.load = false;
      });
  }
}