/**
 *
 * @fileoverview SalesPage
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
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
})
export class SalesPage implements OnInit {

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

  constructor(private api: ApiService, private helper: HelperService) {}

  ngOnInit() {
    this.loadData();
  }

  setSale(item) {
    localStorage.setItem('sale', JSON.stringify(item));
    this.routes(`sales/${item.id}/show`);
  }

  loadData() {
    this.load = true;
    this.api
      .get(`shoppings/${this.profile.id}`)
      .then((response: any) => {
        this.load = false;
        //this.methods = response.methods;
        //this.cards   = response.cards;
        if(response.shoppings.length){
          this.setSale(response.shoppings[0]);
        }
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
