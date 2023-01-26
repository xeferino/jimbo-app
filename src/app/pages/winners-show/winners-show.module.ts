import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WinnersShowPageRoutingModule } from './winners-show-routing.module';

import { WinnersShowPage } from './winners-show.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WinnersShowPageRoutingModule
  ],
  declarations: [WinnersShowPage]
})
export class WinnersShowPageModule {}
