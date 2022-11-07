/**
 *
 * @fileoverview BeadsAddPage
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
  selector: 'app-beads-add',
  templateUrl: './beads-add.page.html',
  styleUrls: ['./beads-add.page.scss'],
})
export class BeadsAddPage implements OnInit {

  profile: any = JSON.parse(localStorage.getItem('profile'));
  
  form: any = {
    bank: null,
    number: null,
    type: null,
    user_id: this.profile.id,
    name: this.profile.names,
    phone: this.profile.phone,
    email: this.profile.email,
    dni: this.profile.dni,
    description: null,
  };

  errors: any = {
    bank: null,
    number: null,
    type: null,
    user_id: null,
    name: null,
    phone: null,
    email: null,
    dni: null,
    description: null,
  };

  touch: any = {
    bank: false,
    number: false,
    type: false,
    user_id: false,
    name: false,
    phone: false,
    email: false,
    dni: false,
    description: false,
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
    } else if (input == 'name') {
      this.touch.password = true;
      if (this.form.name == '' || this.form.name == null) {
        this.errors.password = 'Ingresa un nombre válido';
      } else if (this.form.name.length < 6) {
        this.errors.name = 'El nombre debe tener al mínimo 6 caracteres';
      } else {
        this.errors.name = null;
      }
    }

    if (!this.errors.name) {
      this.disabled = false;
    }
  }

  sendData() {
    this.load = true;
    this.api
      .post(`user/accounts`, this.form)
      .then((response: any) => {
        this.load = false;
        this.helper.toast(response.message, 'Bien hecho');
        this.routes('beads');
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
