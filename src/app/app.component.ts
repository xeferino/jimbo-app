/**
 * 
 * @fileoverview AppComponent
 *
 * @version 1.0
 *
 * @author Milan Gotera <milangotera@gmail.com>
 *
*/

import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
    
  constructor(
    private platform: Platform,
  ){
    this.initializeApp();
  }

  initializeApp() {
    alert('initializeApp');
    this.platform.ready().then(() => {
      alert('then');
    }).catch(() => {
      alert('catch');
    });
  }
}
