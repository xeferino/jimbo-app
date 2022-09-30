import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WinnersPageRoutingModule } from './winners-routing.module';

import { WinnersPage } from './winners.page';

import { SharedModule } from '../../components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WinnersPageRoutingModule,
    SharedModule
  ],
  declarations: [WinnersPage]
})
export class WinnersPageModule {}
