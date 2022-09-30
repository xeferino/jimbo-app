/**
 *
 * @fileoverview ForgotPage
 *
 * @version 1.0
 *
 * @author Milan Gotera <milangotera@gmail.com>
 *
 */

import { Component, OnInit } from '@angular/core';

import { ApiService } from 'src/app/services/api/api.service';
import { HelperService } from 'src/app/services/helper/helper.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {

  form: any = {
    email: null,
    password: null,
    cpassword: null,
  };

  errors: any = {
    email: null,
    password: null,
    cpassword: null,
  };

  touch: any = {
    email: false,
    password: false,
    cpassword: false,
  };

  load: boolean = false;

  disabled: boolean = true;

  show: boolean = false;

  cshow: boolean = false;

  view: number = 1;

  constructor(private auth: AuthService, private api: ApiService, private helper: HelperService) { }

  ngOnInit() {
  }

  validate(input) {

    this.disabled = false;

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
    } else if (input == 'cpassword') {
      this.touch.cpassword = true;
      if (this.form.cpassword == '' || this.form.cpassword == null) {
        this.errors.cpassword = 'Ingresa una contraseña válida';
      } else if (this.form.cpassword.length < 6) {
        this.errors.cpassword = 'La contraseña debe tener al mínimo 6 caracteres';
      }  else if (this.form.cpassword != this.form.password) {
        this.errors.cpassword = 'Las contraseñas no coinciden';
      } else {
        this.errors.cpassword = null;
      }
    }  else if (input == 'code') {
      this.touch.code = true;
      if (this.form.code == '' || this.form.code == null) {
        this.errors.code = 'Ingresa una contraseña válida';
      } else if (this.form.code.length < 4) {
        this.errors.code = 'La contraseña debe tener al mínimo 4 caracteres';
      } else {
        this.errors.code = null;
      }
    }

    if(this.view == 1 && this.errors.email != null){ this.disabled = true; }
    if(this.view == 2 && (this.errors.password != null || this.errors.cpassword != null)){ this.disabled = true; }

  }

  send () {
    this.load = true;
    setTimeout(() => { this.load = false; this.view = 2; }, 2000);
  }

  change() {
    this.load = true;
    this.api
      .post(`forgot`, this.form)
      .then((response: any) => {
        this.load = false;
        this.helper.toast('Se ha cambiado la contraseña correctamente', 'Bien hecho');
        this.routes('login');
      })
      .catch((danger: any) => {
        this.load = false;
        if (danger.error.errors) {
          this.errors = danger.error.errors;
        }
        this.helper.toast(danger.error.message, 'Lo siento');
      });
  }

  password() {
    this.show = this.show ? false : true;
  }

  cpassword() {
    this.cshow = this.cshow ? false : true;
  }

  routes(route) {
    this.helper.routes(route);
  }

}

