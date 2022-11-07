import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalesShowPageRoutingModule } from './sales-show-routing.module';

import { SalesShowPage } from './sales-show.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalesShowPageRoutingModule
  ],
  declarations: [SalesShowPage]
})
export class SalesShowPageModule {}
