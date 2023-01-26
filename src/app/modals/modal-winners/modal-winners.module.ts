import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalWinnersPageRoutingModule } from './modal-winners-routing.module';

import { ModalWinnersPage } from './modal-winners.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalWinnersPageRoutingModule
  ],
  declarations: [ModalWinnersPage]
})
export class ModalWinnersPageModule {}
