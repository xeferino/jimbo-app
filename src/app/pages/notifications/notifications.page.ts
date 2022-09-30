/**
 *
 * @fileoverview NotificationsPage
 *
 * @version 1.0
 *
 * @author Milan Gotera <milangotera@gmail.com>
 *
 */

 import { Component, OnInit } from '@angular/core';
 import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  load: boolean = true;

  notifications: any = [];

  constructor(private helper: HelperService) { }

  ngOnInit() {
    setTimeout(() => {  this.load = false; }, 3000);
  }

  routes(route) {
    this.helper.routes(route);
  }

}
