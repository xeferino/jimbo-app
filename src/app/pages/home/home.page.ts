/**
 *
 * @fileoverview HomePage
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
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  load: boolean = true;

  constructor(private api: ApiService, private helper: HelperService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.load = true;
    this.api
      .get(`settings/modules`)
      .then((response: any) => {
        this.load = false;
        localStorage.setItem('menus', JSON.stringify(response.menus));
        localStorage.setItem('views', JSON.stringify(response.views));
      })
      .catch((danger: any) => {
        this.load = false;
      });
  }

}
