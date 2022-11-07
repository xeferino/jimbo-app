import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeadsAddPage } from './beads-add.page';

const routes: Routes = [
  {
    path: '',
    component: BeadsAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeadsAddPageRoutingModule {}
