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

  profile: any = JSON.parse(localStorage.getItem('profile'));
  
  raffles: any = [];

  load: boolean = true;

  constructor(private api: ApiService, private helper: HelperService) {}

  ngOnInit() {
    this.loadData();
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

  favoriteRaffles(item){
    this.load = true;
    this.api
      .post(`raflles/favorites`, { user_id: this.profile.id, raffle_id: item.id })
      .then((response: any) => {
        this.load = false;
        this.helper.toast(response.message, 'Bien hecho');
        //this.raffles = response.raffles;
      })
      .catch((danger: any) => {
        this.load = false;
      });
  }

  openRaffles(item){
    localStorage.setItem('raffle', JSON.stringify(item));
    this.routes(`raffles/${item.id}`);
  }

  routes(route){
    this.helper.routes(route);
  }
}