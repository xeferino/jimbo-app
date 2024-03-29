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

  load: boolean = true;

  shopping: any = JSON.parse(localStorage.getItem('sale'));

  show: boolean = false;

  constructor(private api: ApiService, private helper: HelperService) {}

  ngOnInit() {
    this.loadData();
  }

  setShow() {
    this.show = !this.show;
  }

  loadData() {
    this.load = true;
    this.api
      .get(`sales/tickets/${this.shopping.id}`)
      .then((response: any) => {
        this.load = false;
        this.shopping = response.sale;
      })
      .catch((danger: any) => {
        this.load = false;
      });
  }

  back () {
    this.routes(`sales`);
  }

  routes(route){
    this.helper.routes(route);
  }

}
