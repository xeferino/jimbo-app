/**
 *
 * @fileoverview ReferPage
 *
 * @version 1.0
 *
 * @author Milan Gotera <milangotera@gmail.com>
 *
 */

 import { Component, OnInit } from '@angular/core';
 import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-refer',
  templateUrl: './refer.page.html',
  styleUrls: ['./refer.page.scss'],
})
export class ReferPage implements OnInit {

  load: boolean = false;

  profile: any = JSON.parse(localStorage.getItem('profile'));

  constructor(private helper: HelperService) { }

  ngOnInit() {
  }

  routes(route) {
    this.helper.routes(route);
  }

}
