import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeadsAddPageRoutingModule } from './beads-add-routing.module';

import { BeadsAddPage } from './beads-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BeadsAddPageRoutingModule
  ],
  declarations: [BeadsAddPage]
})
export class BeadsAddPageModule {}
