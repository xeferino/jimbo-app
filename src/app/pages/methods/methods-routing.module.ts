import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MethodsPage } from './methods.page';

const routes: Routes = [
  {
    path: '',
    component: MethodsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MethodsPageRoutingModule {}
