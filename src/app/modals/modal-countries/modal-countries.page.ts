/**
 *
 * @fileoverview ModalCountriesPage
 *
 * @version 1.0
 *
 * @author Milan Gotera <milangotera@gmail.com>
 *
 */

 import { Component, OnInit } from '@angular/core';
 import { ModalController } from '@ionic/angular';
 import { ApiService } from 'src/app/services/api/api.service';
 import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-modal-countries',
  templateUrl: './modal-countries.page.html',
  styleUrls: ['./modal-countries.page.scss'],
})
export class ModalCountriesPage implements OnInit {

  countries: any = [];

  load: boolean = true;

  constructor(private api: ApiService, private helper: HelperService, private modal: ModalController) { }

  ngOnInit() {
    this.loadCountries();
  }

  loadCountries() {
    this.load = true;
    this.api
      .get(`countries`)
      .then((response: any) => {
        this.load = false;
        this.countries = response.contries;
      })
      .catch((danger: any) => {
        this.load = false;
        this.helper.toast('No se pudo cargar las ciudades', 'Lo siento');
      });
  }

  selectCountry(country) {
    this.modal.dismiss(
      { country: country }
    );
  }

}
