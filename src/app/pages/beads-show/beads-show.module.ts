import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeadsShowPageRoutingModule } from './beads-show-routing.module';

import { BeadsShowPage } from './beads-show.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BeadsShowPageRoutingModule
  ],
  declarations: [BeadsShowPage]
})
export class BeadsShowPageModule {}
