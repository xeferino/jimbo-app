import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RafflesShowPage } from './raffles-show.page';

const routes: Routes = [
  {
    path: '',
    component: RafflesShowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RafflesShowPageRoutingModule {}
