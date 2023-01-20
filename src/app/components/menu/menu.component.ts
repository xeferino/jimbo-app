/**
 *
 * @fileoverview MenuComponent
 *
 * @version 1.0
 *
 * @author Milan Gotera <milangotera@gmail.com>
 *
 */

 import { Component, OnInit, Input } from '@angular/core';
 import { ApiService } from 'src/app/services/api/api.service';
 import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  @Input() active: string = 'home';

  notifications: any = [];

  profile: any = JSON.parse(localStorage.getItem('profile'));

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
