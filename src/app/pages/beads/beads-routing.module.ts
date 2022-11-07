import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeadsPage } from './beads.page';

const routes: Routes = [
  {
    path: '',
    component: BeadsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeadsPageRoutingModule {}
