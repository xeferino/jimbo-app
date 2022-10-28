import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileAccountPageRoutingModule } from './profile-account-routing.module';

import { ProfileAccountPage } from './profile-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileAccountPageRoutingModule
  ],
  declarations: [ProfileAccountPage]
})
export class ProfileAccountPageModule {}
