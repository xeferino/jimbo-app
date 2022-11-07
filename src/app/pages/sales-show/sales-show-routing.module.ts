import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesShowPage } from './sales-show.page';

const routes: Routes = [
  {
    path: '',
    component: SalesShowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesShowPageRoutingModule {}
