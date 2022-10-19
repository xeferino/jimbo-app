/**
 *
 * @fileoverview RegisterPage
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
import { AuthService } from 'src/app/services/auth/auth.service';
import { ModalCountriesPage } from '../../modals/modal-countries/modal-countries.page';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  form: any = {
    name: null,
    dni: null,
    phone: null,
    email: null,
    password: null,
    cpassword: null,
    country_id: null,
  };

  errors: any = {
    name: null,
    dni: null,
    phone: null,
    email: null,
    password: null,
    cpassword: null,
  };

  touch: any = {
    name: false,
    dni: false,
    phone: false,
    email: false,
    password: false,
    cpassword: false,
  };

  load: boolean = false;

  disabled: boolean = true;

  show: boolean = false;

  countries: any = [];

  country: any;

  constructor(private auth: AuthService, private api: ApiService, private helper: HelperService, private modal: ModalController) { }

  ngOnInit() {
    this.openCountries();
  }

  validate(input) {
    this.disabled = true;

    if (input == 'email') {
      this.touch.email = true;
      const emailValid = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
      if (emailValid.test(this.form.email)) {
        this.errors.email = null;
      } else {
        this.errors.email = 'Ingresa un correo válido';
      }
    } else if (input == 'name') {
      this.touch.name = true;
      if (this.form.name == '' || this.form.name == null) {
        this.errors.name = 'Ingresa un nombre válido';
      } else {
        this.errors.name = null;
      }
    }  else if (input == 'password') {
      this.touch.password = true;
      if (this.form.password == '' || this.form.password == null) {
        this.errors.password = 'Ingresa una contraseña válida';
      } else if (this.form.password.length < 6) {
        this.errors.password = 'La contraseña debe tener al mínimo 6 caracteres';
      } else {
        this.errors.password = null;
      }
    }  else if (input == 'cpassword') {
      this.touch.cpassword = true;
      if (this.form.cpassword == '' || this.form.cpassword == null) {
        this.errors.cpassword = 'Ingresa una contraseña válida';
      } else if (this.form.cpassword.length < 6) {
        this.errors.cpassword = 'La contraseña debe tener al mínimo 6 caracteres';
      } else {
        this.errors.cpassword = null;
      }
    } else if (input == 'dni') {
      this.touch.dni = true;
      if (this.form.dni == '' || this.form.dni == null) {
        this.errors.dni = 'Ingresa un dni válido';
      } else if (this.form.dni.length < 4) {
        this.errors.dni = 'El dni debe tener al mínimo 4 caracteres';
      } else {
        this.errors.dni = null;
      }
    }  else if (input == 'phone') {
      this.touch.phone = true;
      if (this.form.phone == '' || this.form.phone == null) {
        this.errors.phone = 'Ingresa un teléfono válido';
      } else if (this.form.phone.length < 5) {
        this.errors.phone = 'El teléfono debe tener al mínimo 5 caracteres';
      } else {
        this.errors.phone = null;
      }
    }
    

    if (
      !this.errors.name && 
      !this.errors.dni && 
      !this.errors.phone && 
      !this.errors.email && 
      !this.errors.password && 

      this.touch.name &&
      this.touch.dni &&
      this.touch.phone &&
      this.touch.email && 
      this.touch.password
    ) {
      this.disabled = false;
    }
  }

  continue() {
    this.load = true;
    this.form.cpassword = this.form.password;
    this.form.phone = this.form.phone.toString();
    this.api
      .post(`signup`, this.form)
      .then((response: any) => {
        this.load = false;
        this.helper.toast(response.message, 'Bien hecho');
        this.auth.profile(response.profile);
        this.auth.token(response.token);
        this.routes('home');
      })
      .catch((danger: any) => {
        this.load = false;
        if (danger.error.errors) {
          this.errors = danger.error.errors;
        }
        this.helper.toast(danger.error.message, 'Lo siento');
      });
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

  async openCountries() {
    const modal = await this.modal.create({
      component: ModalCountriesPage,
      cssClass: 'app-modal modal-countries',
      componentProps: {},
      backdropDismiss: false,
      swipeToClose: false,
      keyboardClose: false,
    });

    await modal.present();

    modal.onDidDismiss().then((success) => {
      this.country = success.data.country;
      this.form.country_id = success.data.country.id;
    });
  }

  password() {
    this.show = this.show ? false : true;
  }

  routes(route) {
    this.helper.routes(route);
  }

}
