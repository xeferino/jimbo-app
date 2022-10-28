import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalSalePage } from './modal-sale.page';

const routes: Routes = [
  {
    path: '',
    component: ModalSalePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalSalePageRoutingModule {}
