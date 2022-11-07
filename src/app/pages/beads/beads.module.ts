import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeadsPageRoutingModule } from './beads-routing.module';

import { BeadsPage } from './beads.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BeadsPageRoutingModule
  ],
  declarations: [BeadsPage]
})
export class BeadsPageModule {}
