import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeadsRequestPageRoutingModule } from './beads-request-routing.module';

import { BeadsRequestPage } from './beads-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BeadsRequestPageRoutingModule
  ],
  declarations: [BeadsRequestPage]
})
export class BeadsRequestPageModule {}
