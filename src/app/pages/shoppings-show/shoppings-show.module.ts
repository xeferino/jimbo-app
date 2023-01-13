import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShoppingsShowPageRoutingModule } from './shoppings-show-routing.module';

import { ShoppingsShowPage } from './shoppings-show.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShoppingsShowPageRoutingModule
  ],
  declarations: [ShoppingsShowPage]
})
export class ShoppingsShowPageModule {}
