import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeadsRequestPage } from './beads-request.page';

const routes: Routes = [
  {
    path: '',
    component: BeadsRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeadsRequestPageRoutingModule {}
