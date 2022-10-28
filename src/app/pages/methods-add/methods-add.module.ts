import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MethodsAddPageRoutingModule } from './methods-add-routing.module';

import { MethodsAddPage } from './methods-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MethodsAddPageRoutingModule
  ],
  declarations: [MethodsAddPage]
})
export class MethodsAddPageModule {}
