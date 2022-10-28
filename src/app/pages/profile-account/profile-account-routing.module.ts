import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileAccountPage } from './profile-account.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileAccountPageRoutingModule {}
