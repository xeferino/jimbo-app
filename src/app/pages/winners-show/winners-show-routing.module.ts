import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WinnersShowPage } from './winners-show.page';

const routes: Routes = [
  {
    path: '',
    component: WinnersShowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WinnersShowPageRoutingModule {}
