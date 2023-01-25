/**
 *
 * @fileoverview TopComponent
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
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss'],
})
export class TopComponent implements OnInit {

  profile: any = JSON.parse(localStorage.getItem('profile'));
  
  notifications: any = [];

  constructor(private helper: HelperService, private api: ApiService) { }

  ngOnInit() {
    //this.loadNotifications();
  }

  loadNotifications(clean: number = 0) {
    this.api
      .get(`user/notifications/all/${this.profile.id}`)
      .then((response: any) => {
        this.notifications = response.notifications;
      })
      .catch((danger: any) => {
        
      });
  }

  routes(route: string) { this.helper.routes(route); }

}
