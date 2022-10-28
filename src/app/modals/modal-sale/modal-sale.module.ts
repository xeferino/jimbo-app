import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalSalePageRoutingModule } from './modal-sale-routing.module';

import { ModalSalePage } from './modal-sale.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalSalePageRoutingModule
  ],
  declarations: [ModalSalePage]
})
export class ModalSalePageModule {}
