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
 import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  @Input() active: string = 'home';

  constructor(private helper: HelperService) { }

  ngOnInit() {}

  routes(route: string) { this.helper.routes(route); }

}
