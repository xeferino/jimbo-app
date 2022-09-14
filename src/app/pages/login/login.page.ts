/**
 *
 * @fileoverview LoginPage
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
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

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

  show: boolean = false;

  constructor(private auth: AuthService, private api: ApiService, private helper: HelperService) { }

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

  login() {
    this.load = true;
    setTimeout(() => {
      this.load = false;
      this.auth.token('12345678901234567890123456789012345');
      this.auth.profile({
        id: 3,
        name: "Milan Gotera",
        email: "milangotera@gmail.com"
      });
      this.helper.toast('Ahora puedes disfrutar del servicio', 'Bienvenido');
      this.routes('home');
    }, 3 * 1000);
    /*
    this.api
      .post(`login`, this.form)
      .then((response: any) => {
        this.load = false;
      })
      .catch((danger: any) => {
        this.load = false;
        if (danger.error.errors) {
          this.errors = danger.error.errors;
        }
        this.helper.toast(danger.error.message, 'Lo siento');
      });
    */
  }

  password() {
    this.show = this.show ? false : true;
  }

  routes(route) {
    this.helper.routes(route);
  }

}
