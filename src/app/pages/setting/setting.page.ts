/**
 *
 * @fileoverview SettingPage
 *
 * @version 1.0
 *
 * @author Milan Gotera <milangotera@gmail.com>
 *
 */

 import { Component, OnInit } from '@angular/core';
 import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  constructor(private helper: HelperService) { }

  ngOnInit() {
  }

  routes(route: string) { this.helper.routes(route); }

}
