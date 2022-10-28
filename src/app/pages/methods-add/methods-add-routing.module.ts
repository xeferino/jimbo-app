import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MethodsAddPage } from './methods-add.page';

const routes: Routes = [
  {
    path: '',
    component: MethodsAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MethodsAddPageRoutingModule {}
