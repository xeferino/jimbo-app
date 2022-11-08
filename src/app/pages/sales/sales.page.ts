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

  load: boolean = true;

  shoppings: any = [];

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
        this.shoppings = response.shoppings;
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
