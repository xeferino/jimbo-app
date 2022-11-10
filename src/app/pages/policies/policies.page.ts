/**
 *
 * @fileoverview PoliciesPage
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
  selector: 'app-policies',
  templateUrl: './policies.page.html',
  styleUrls: ['./policies.page.scss'],
})
export class PoliciesPage implements OnInit {

  constructor(private api: ApiService, private helper: HelperService) { }

  ngOnInit() {
    
  }

  routes(route) {
    this.helper.routes(route);
  }

}
