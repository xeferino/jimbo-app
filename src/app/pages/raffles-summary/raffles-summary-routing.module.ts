import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RafflesSummaryPage } from './raffles-summary.page';

const routes: Routes = [
  {
    path: '',
    component: RafflesSummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RafflesSummaryPageRoutingModule {}
