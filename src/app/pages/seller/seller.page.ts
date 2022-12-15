/**
 *
 * @fileoverview SellerPage
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
import { ModalCountriesPage } from '../../modals/modal-countries/modal-countries.page';
import { ModalVerifiedPage } from '../../modals/modal-verified/modal-verified.page';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.page.html',
  styleUrls: ['./seller.page.scss'],
})
export class SellerPage implements OnInit {

  load: boolean = false;

  profile: any = JSON.parse(localStorage.getItem('profile'));

  form: any = {
    names: this.profile.names,
    surnames: this.profile.surnames,
    dni: this.profile.dni,
    phone: this.profile.phone,
    email: this.profile.email,
    password: null,
    cpassword: null,
    country_id: this.profile.country.id,
    address: this.profile.address,
    address_city: this.profile.address_city,
    code: null,
    become_seller: this.profile.become_seller
  };

  errors: any = {
    name: null,
    surnames: null,
    dni: null,
    phone: null,
    email: null,
    password: null,
    cpassword: null,
    address: null,
    address_city: null,
  };

  touch: any = {
    address: this.profile.address ? true : false,
    address_city: this.profile.address_city ? true : false,
    surnames: true,
    name: true,
    dni: true,
    phone: true,
    email: true,
    password: true,
    cpassword: true,
  };

  show: boolean = false;

  disabled: boolean = false;

  country: any = this.profile.country;

  constructor(private api: ApiService, private helper: HelperService, private modal: ModalController) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.load = true;
    this.api
      .get(`user/profile/${this.profile.id}`)
      .then((response: any) => {
        this.load = false;
        this.profile = response.profile;
        this.country = this.profile.country;
        localStorage.setItem('profile', JSON.stringify(this.profile));
      })
      .catch((danger: any) => {
        this.load = false;
        this.helper.toast(danger.error.message, 'Lo siento');
      });
  }

  sendData() {
    this.load = true;
    this.form.phone = this.form.phone.toString();
    this.api
      .post(`user/to/seller/${this.profile.id}`, this.form)
      .then((response: any) => {
        this.load = false;
        this.helper.toast(response.message, 'Bien hecho');
        this.routes('profile/account');
      })
      .catch((danger: any) => {
        this.load = false;
        if (danger.error.errors) {
          this.errors = danger.error.errors;
          if(this.errors.code) {

          }
        }
        this.helper.toast(danger.error.message, 'Lo siento');
      });
  }

  password() {
    this.show = this.show ? false : true;
  }

  routes(route) {
    this.helper.routes(route);
  }

}
