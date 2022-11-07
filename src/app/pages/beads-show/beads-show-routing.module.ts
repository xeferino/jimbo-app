import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeadsShowPage } from './beads-show.page';

const routes: Routes = [
  {
    path: '',
    component: BeadsShowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeadsShowPageRoutingModule {}
