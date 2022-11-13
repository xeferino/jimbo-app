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
 import { ApiService } from 'src/app/services/api/api.service';
 import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  profile: any = JSON.parse(localStorage.getItem('profile'));

  load: boolean = true;

  notifications: any = [];

  constructor(private api: ApiService, private helper: HelperService) {}

  ngOnInit() {
    this.loadData(0);
  }

  loadData(clean: number = 0) {
    this.load = true;
    this.api
      .get(`user/notifications/all/${this.profile.id}?clean=${clean}`)
      .then((response: any) => {
        this.load = false;
        this.notifications = response.notifications;
      })
      .catch((danger: any) => {
        this.load = false;
      });
  }

  routes(route) {
    this.helper.routes(route);
  }

}
