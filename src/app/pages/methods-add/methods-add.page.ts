/**
 *
 * @fileoverview MethodsAddPage
 *
 * @version 1.0
 *
 * @author Milan Gotera <milangotera@gmail.com>
 *
 */

 import { Component, OnInit } from '@angular/core';
 import { ApiService } from 'src/app/services/api/api.service';
 import { HelperService } from 'src/app/services/helper/helper.service';
 import * as moment from 'moment';

@Component({
  selector: 'app-methods-add',
  templateUrl: './methods-add.page.html',
  styleUrls: ['./methods-add.page.scss'],
})
export class MethodsAddPage implements OnInit {

  profile: any = JSON.parse(localStorage.getItem('profile'));
  
  form: any = {
    email: null,
    password: null,
  };

  errors: any = {
    email: null,
    password: null,
  };

  touch: any = {
    email: false,
    password: false,
  };

  load: boolean = false;

  disabled: boolean = true;

  constructor(private api: ApiService, private helper: HelperService) {}

  ngOnInit() {
    
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
    } else if (input == 'password') {
      this.touch.password = true;
      if (this.form.password == '' || this.form.password == null) {
        this.errors.password = 'Ingresa una contraseña válida';
      } else if (this.form.password.length < 6) {
        this.errors.password = 'La contraseña debe tener al mínimo 6 caracteres';
      } else {
        this.errors.password = null;
      }
    }

    if (!this.errors.email && !this.errors.password && this.touch.email && this.touch.password) {
      this.disabled = false;
    }
  }

  sendData() {
    this.load = true;
    this.api
      .post(`user/cards`, {
        number: this.form.number,
        code: this.form.code,
        date_expire: moment(this.form.date_expire).format('MM/YY'),
        user_id: this.profile.id,
      })
      .then((response: any) => {
        this.load = false;
        this.helper.toast(response.message, 'Bien hecho');
        this.routes('methods');
      })
      .catch((danger: any) => {
        this.load = false;
        if (danger.error.errors) {
          this.errors = danger.error.errors;
        }
        this.helper.toast(danger.error.message, 'Lo siento');
      });
  }

  routes(route){
    this.helper.routes(route);
  }

}
