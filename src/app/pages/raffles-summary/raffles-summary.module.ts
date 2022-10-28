import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RafflesSummaryPageRoutingModule } from './raffles-summary-routing.module';

import { RafflesSummaryPage } from './raffles-summary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RafflesSummaryPageRoutingModule
  ],
  declarations: [RafflesSummaryPage]
})
export class RafflesSummaryPageModule {}
