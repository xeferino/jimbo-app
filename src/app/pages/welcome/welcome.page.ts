/**
 *
 * @fileoverview WelcomePage
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
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  load: boolean = true;

  constructor(private api: ApiService, private helper: HelperService) { }

  ngOnInit() {
    //this.loadData();
  }

  loadData() {
    this.load = true;
    this.api
      .get(`settings/modules`)
      .then((response: any) => {
        this.load = false;
      })
      .catch((danger: any) => {
        this.load = false;
      });
  }

  routes(route) {
    this.helper.routes(route);
  }

}
