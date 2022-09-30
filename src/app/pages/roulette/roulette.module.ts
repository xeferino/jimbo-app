import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoulettePageRoutingModule } from './roulette-routing.module';

import { RoulettePage } from './roulette.page';

import { SharedModule } from '../../components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoulettePageRoutingModule,
    SharedModule
  ],
  declarations: [RoulettePage]
})
export class RoulettePageModule {}
