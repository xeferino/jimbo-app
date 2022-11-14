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
import { ModalVerifiedPage } from '../../modals/modal-verified/modal-verified.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

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
        this.validate(null);
        localStorage.setItem('profile', JSON.stringify(this.profile));
      })
      .catch((danger: any) => {
        this.load = false;
        this.helper.toast(danger.error.message, 'Lo siento');
      });
  }

  verifiedData() {
    this.load = true;
    this.form.phone = this.form.phone.toString();
    this.api
      .post(`resend-code-verified-email`, { id: this.profile.id, email: this.form.email })
      .then((response: any) => {
        this.load = false;
        this.openVerified('Verifica el códio en tu correo');
      })
      .catch((danger: any) => {
        this.load = false;
        if (danger.error.errors) {
          this.errors = danger.error.errors;
        }
        this.helper.toast(danger.error.message, 'Lo siento');
      });
  }

  updateData() {
    this.load = true;
    this.form.phone = this.form.phone.toString();
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
          if(this.errors.code) {

          }
        }
        this.helper.toast(danger.error.message, 'Lo siento');
      });
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
    } else if (input == 'names') {
      this.touch.names = true;
      if (this.form.names == '' || this.form.names == null) {
        this.errors.names = 'Ingresa un nombre válido';
      } else {
        this.errors.names = null;
      }
    }
    else if (input == 'surnames') {
      this.touch.surnames = true;
      if (this.form.surnames == '' || this.form.surnames == null) {
        this.errors.surnames = 'Ingresa un apellido válido';
      } else {
        this.errors.surnames = null;
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
    }  else if (input == 'address_city') {
      this.touch.address_city = true;
      if (this.form.address_city == '' || this.form.address_city == null) {
        this.errors.address_city = 'Ingresa una ciudad válido';
      } else if (this.form.address_city.length < 4) {
        this.errors.address_city = 'La ciudad debe tener al mínimo 5 caracteres';
      } else {
        this.errors.address_city = null;
      }
    } else if (input == 'address') {
      this.touch.address = true;
      if (this.form.address == '' || this.form.address == null) {
        this.errors.address = 'Ingresa una dirección válido';
      } else if (this.form.address.length < 4) {
        this.errors.address = 'La dirección debe tener al mínimo 5 caracteres';
      } else {
        this.errors.address = null;
      }
    }

    if (
      !this.errors.names &&
      !this.errors.surnames && 
      !this.errors.dni && 
      !this.errors.phone && 
      !this.errors.email && 
      !this.errors.address_city && 
      !this.errors.address && 
      //!this.errors.password && 

      this.touch.address &&
      this.touch.address_city &&
      this.touch.names &&
      this.touch.surnames &&
      this.touch.dni &&
      this.touch.phone &&
      this.touch.email 
      //this.touch.password
    ) {
      this.disabled = false;
    }
  }

  setImagen() {
    let element: HTMLElement = document.querySelector('input[type="file"]') as HTMLElement;
    element.click();
  }

  loadImage(event) {
    var file = event.target.files[0], imageType = /image.*/;
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

  async openVerified(message) {
    const modal = await this.modal.create({
      component: ModalVerifiedPage,
      cssClass: 'app-modal modal-alert',
      componentProps: {
        message: message
      },
      backdropDismiss: false,
      swipeToClose: false,
      keyboardClose: false,
    });

    await modal.present();

    modal.onDidDismiss().then((success) => {
      if(success.data.confirm) {
        this.form.code = success.data.code;
        this.updateData();
      }
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
