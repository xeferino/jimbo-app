import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalVerifiedPageRoutingModule } from './modal-verified-routing.module';

import { ModalVerifiedPage } from './modal-verified.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalVerifiedPageRoutingModule
  ],
  declarations: [ModalVerifiedPage]
})
export class ModalVerifiedPageModule {}
