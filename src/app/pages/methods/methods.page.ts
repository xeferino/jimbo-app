/**
 *
 * @fileoverview MethodsPage
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
  selector: 'app-methods',
  templateUrl: './methods.page.html',
  styleUrls: ['./methods.page.scss'],
})
export class MethodsPage implements OnInit {

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

  setData(tickets, promotions) {
    
  }

  buyData() {
    
  }

  saleData() {

  }

  setMethod(item) {
    if(item.valid) {
      localStorage.setItem('method', JSON.stringify(item));
      this.back ();
    } else {
      this.helper.toast('Este método de pago no está disponible', 'Lo siento');
    }
  }

  loadData() {
    this.load = true;
    this.api
      .get(`payment/methods/all`)
      .then((response: any) => {
        this.load = false;
        this.methods = response.methods;
        this.cards   = response.cards;
      })
      .catch((danger: any) => {
        this.load = false;
      });
  }

  back () {
    if(this.ticket && this.raffles) {
      this.routes(`raffles/${this.raffles.id}/summary`);
    }
    else {
      this.routes(`setting`);
    }
  }

  routes(route){
    this.helper.routes(route);
  }

}
