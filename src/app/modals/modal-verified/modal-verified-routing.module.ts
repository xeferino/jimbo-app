import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalVerifiedPage } from './modal-verified.page';

const routes: Routes = [
  {
    path: '',
    component: ModalVerifiedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalVerifiedPageRoutingModule {}
