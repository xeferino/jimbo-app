import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MethodsPageRoutingModule } from './methods-routing.module';

import { MethodsPage } from './methods.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MethodsPageRoutingModule
  ],
  declarations: [MethodsPage]
})
export class MethodsPageModule {}
