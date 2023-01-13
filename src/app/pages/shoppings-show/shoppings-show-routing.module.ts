import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingsShowPage } from './shoppings-show.page';

const routes: Routes = [
  {
    path: '',
    component: ShoppingsShowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingsShowPageRoutingModule {}
