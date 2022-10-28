import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RafflesShowPageRoutingModule } from './raffles-show-routing.module';

import { RafflesShowPage } from './raffles-show.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RafflesShowPageRoutingModule
  ],
  declarations: [RafflesShowPage]
})
export class RafflesShowPageModule {}
