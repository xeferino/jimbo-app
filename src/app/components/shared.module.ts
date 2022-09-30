/**
 *
 * @fileoverview SharedModule
 *
 * @version 1.0
 *
 * @author Milan Gotera <milangotera@gmail.com>
 *
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { TopComponent } from './top/top.component';
import { HeadComponent } from './head/head.component';
import { MenuComponent } from './menu/menu.component';
import { BannersComponent } from './banners/banners.component';
import { RafflesComponent } from './raffles/raffles.component';

@NgModule({
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
  declarations: [
    TopComponent,
    HeadComponent,
    MenuComponent,
    BannersComponent,
    RafflesComponent
  ],
  exports: [
    TopComponent,
    HeadComponent,
    MenuComponent,
    BannersComponent,
    RafflesComponent
  ],
})
export class SharedModule {}
