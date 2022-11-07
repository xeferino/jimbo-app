/**
 *
 * @fileoverview SalesShowPage
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
  selector: 'app-sales-show',
  templateUrl: './sales-show.page.html',
  styleUrls: ['./sales-show.page.scss'],
})
export class SalesShowPage implements OnInit {

  profile: any = JSON.parse(localStorage.getItem('profile'));

  raffles: any = JSON.parse(localStorage.getItem('raffle'));

  ticket: any = JSON.parse(localStorage.getItem('ticket'));

  load: boolean = true;

  method: any = JSON.parse(localStorage.getItem('method')) || {
    id: 0,
    name: 'Pagar con mis JIB',
    icon: 'assets/icon/jib.png',
    type: 'jib'
  };

  methods: any = [];

  cards: any = [];

  sale: any = JSON.parse(localStorage.getItem('sale'));

  constructor(private api: ApiService, private helper: HelperService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.load = true;
    this.api
      .get(`shoppings/tickets/${this.sale.id}`)
      .then((response: any) => {
        this.load = false;
        //this.methods = response.methods;
        //this.cards   = response.cards;
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
