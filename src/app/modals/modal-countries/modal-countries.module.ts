import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalCountriesPageRoutingModule } from './modal-countries-routing.module';

import { ModalCountriesPage } from './modal-countries.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalCountriesPageRoutingModule
  ],
  declarations: [ModalCountriesPage]
})
export class ModalCountriesPageModule {}
