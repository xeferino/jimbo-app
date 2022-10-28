/**
 *
 * @fileoverview MethodsAddPage
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
  selector: 'app-methods-add',
  templateUrl: './methods-add.page.html',
  styleUrls: ['./methods-add.page.scss'],
})
export class MethodsAddPage implements OnInit {

  load: boolean = false;

  constructor(private api: ApiService, private helper: HelperService) {}

  ngOnInit() {
    
  }

  sendData() {
    this.helper.toast('Se ha agregado tu tarjeta correctamente', 'Bien hecho');
    this.helper.routes('methods');
  }

  routes(route){
    this.helper.routes(route);
  }

}
