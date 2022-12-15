import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SellerPage } from './seller.page';

const routes: Routes = [
  {
    path: '',
    component: SellerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellerPageRoutingModule {}
