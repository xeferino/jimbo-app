import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileAccountPageRoutingModule } from './profile-account-routing.module';

import { ProfileAccountPage } from './profile-account.page';

import { SharedModule } from '../../components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileAccountPageRoutingModule,
    SharedModule
  ],
  declarations: [ProfileAccountPage]
})
export class ProfileAccountPageModule {}
