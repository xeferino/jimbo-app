/**
 *
 * @fileoverview ProfilePage
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

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  load: boolean = false;

  profile: any = JSON.parse(localStorage.getItem('profile'));

  form: any = {
    name: this.profile.name,
    dni: this.profile.dni,
    phone: this.profile.phone,
    email: this.profile.email,
    password: null,
    cpassword: null,
    country_id: this.profile.country.id,
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
        this.validate(null);
        localStorage.setItem('profile', JSON.stringify(this.profile));
      })
      .catch((danger: any) => {
        this.load = false;
        this.helper.toast(danger.error.message, 'Lo siento');
      });
  }

  updateData() {
    this.load = true;
    this.api
      .post(`user/profile/${this.profile.id}`, this.form)
      .then((response: any) => {
        this.load = false;
        this.helper.toast(response.message, 'Bien hecho');
        this.profile = response.profile;
        this.country = this.profile.country;
        localStorage.setItem('profile', JSON.stringify(this.profile));
        //this.routes('setting');
      })
      .catch((danger: any) => {
        this.load = false;
        if (danger.error.errors) {
          this.errors = danger.error.errors;
        }
        this.helper.toast(danger.error.message, 'Lo siento');
      });
  }

  validate(input) {

    this.disabled = true;

    if (input == 'email') {
      const emailValid = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
      if (emailValid.test(this.form.email)) {
        this.errors.email = null;
      } else {
        this.errors.email = 'Ingresa un correo válido';
      }
    } else if (input == 'name') {
      if (this.form.name == '' || this.form.name == null) {
        this.errors.name = 'Ingresa un nombre válido';
      } else {
        this.errors.name = null;
      }
    }  else if (input == 'password') {
      if (this.form.password == '' || this.form.password == null) {
        this.errors.password = 'Ingresa una contraseña válida';
      } else if (this.form.password.length < 6) {
        this.errors.password = 'La contraseña debe tener al mínimo 6 caracteres';
      } else {
        this.errors.password = null;
      }
    }  else if (input == 'cpassword') {
      if (this.form.cpassword == '' || this.form.cpassword == null) {
        this.errors.cpassword = 'Ingresa una contraseña válida';
      } else if (this.form.cpassword.length < 6) {
        this.errors.cpassword = 'La contraseña debe tener al mínimo 6 caracteres';
      } else {
        this.errors.cpassword = null;
      }
    } else if (input == 'dni') {
      if (this.form.dni == '' || this.form.dni == null) {
        this.errors.dni = 'Ingresa un dni válido';
      } else if (this.form.dni.length < 4) {
        this.errors.dni = 'El dni debe tener al mínimo 4 caracteres';
      } else {
        this.errors.dni = null;
      }
    }  else if (input == 'phone') {
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
      !this.errors.email
    ) {
      this.disabled = false;
    }
  }

  setImagen() {
    let element: HTMLElement = document.querySelector('input[type="file"]') as HTMLElement;
    element.click();
  }

  loadImage(event) {
    var file = event.target.files[0],
      imageType = /image.*/;
    var valid = file.type.match(imageType);

    if (!valid) {
      this.helper.toast('Selecciona un formato de imagen válido', 'Lo siento');
    }

    if (valid) {
      var reader = new FileReader();

      reader.onload = () => {
        var url = reader.result;
        this.form.image    = url;
        this.profile.image = url;
      };

      reader.readAsDataURL(file);
    }
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
