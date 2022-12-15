/**
 * 
 * @fileoverview AppComponent
 *
 * @version 1.0
 *
 * @author Milan Gotera <milangotera@gmail.com>
 *
*/

import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
    
  constructor(
    public platform: Platform
  ){

  }

  ngOnInit() {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then((source) => {
    }).catch(() => {
    });
  }
}
