/**
 *
 * @fileoverview RoulettePage
 *
 * @version 1.0
 *
 * @author Milan Gotera <milangotera@gmail.com>
 *
 */

import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper/helper.service';
import { ApiService } from 'src/app/services/api/api.service';
import { ModalController } from '@ionic/angular';
import { ModalAlertPage } from '../../modals/modal-alert/modal-alert.page';
import Winwheel from 'winwheel';

@Component({
  selector: 'app-roulette',
  templateUrl: './roulette.page.html',
  styleUrls: ['./roulette.page.scss'],
})
export class RoulettePage implements OnInit {

  profile: any = JSON.parse(localStorage.getItem('profile'));

  public ruleta;

  public girar: boolean = false;
  public load: boolean = false;

  bet:  any = [0.00, 0.00, 0.00, 0.00, 0.00, 0.00];

  history: any = [];

  multiple: number = 0.10;

  balance: number = this.profile.balance_usd;

  stake: number = 0.00;

  constructor(
    private helper: HelperService,
    private api: ApiService,
    private modal: ModalController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.crearRuleta();
  }

  loadData(data: any) {
    this.load = true;
    this.api
      .post(`roulettes/wager`, data)
      .then((response: any) => {
        this.load    = false;
        this.profile.balance_usd = response.balance_usd;
        this.profile.balance_jib = response.balance_jib;
        this.balance             = this.profile.balance_usd;
        //localStorage.setItem('profile', JSON.stringify(this.profile));
        this.showAlert(response.title, response.message);
      })
      .catch((danger: any) => {
        this.load = false;
        this.helper.toast(danger.error.message, 'Lo siento');
      });
  }

  setMultiple(multiple: number) {
    if(!this.load && !this.girar) {
      this.multiple = multiple;
    }
  }

  setBet(pos: number, option: string) {
    
    if(!this.load && !this.girar) {
      
      if(option == 'add') {
        this.bet[pos] += this.multiple;
      }
      if(option == 'rm') {
        this.bet[pos] -= this.multiple;
        if(this.bet[pos] < 0) {
          this.bet[pos] = 0.00;
        }
      }

      this.reloadBet();

    }

  }

  reloadBet() {
    this.stake = 0.00;

    this.bet.forEach(bet => {
      this.stake += bet;
    });
  }

  resetBet(){
    if(!this.load && !this.girar) {

      this.bet[0] = 0.00;
      this.bet[1] = 0.00;
      this.bet[2] = 0.00;
      this.bet[3] = 0.00;
      this.bet[4] = 0.00;
      this.bet[5] = 0.00;

      this.reloadBet();
  
    }
  }

  repeatBet(){
    
    if(!this.load && !this.girar) {
      
      let pos: number = 0;

      if(this.history.length > 0) {
        
        const pos: number = this.history.length - 1;
        
        this.bet[0] = this.history[pos][0];
        this.bet[1] = this.history[pos][1];
        this.bet[2] = this.history[pos][2];
        this.bet[3] = this.history[pos][3];
        this.bet[4] = this.history[pos][4];
        this.bet[5] = this.history[pos][5];

        this.reloadBet();

      }
  
    }

  }

  doubleBet() {

    if(!this.load && !this.girar) {
      
      let pos: number = 0;

      if(this.history.length > 0) {

        const pos: number = this.history.length - 1;

        this.bet[0] = this.history[pos][0] * 2;
        this.bet[1] = this.history[pos][1] * 2;
        this.bet[2] = this.history[pos][2] * 2;
        this.bet[3] = this.history[pos][3] * 2;
        this.bet[4] = this.history[pos][4] * 2;
        this.bet[5] = this.history[pos][5] * 2;

        this.reloadBet();

      }
    }

  }

  giraRuleta(){

    let error: any = false;

    if(this.stake > this.balance) {
      error = 'La apuesta no puede ser mayor que tu balance';
    } else if(this.stake > 20000) {
      error = 'La apuesta no puede ser mayor a 20.000';
    }
    else if(this.bet[0] > 5000) {
      error = 'La apuesta 1 no puede ser mayor a 5.000';
    }
    else if(this.bet[1] > 5000) {
      error = 'La apuesta 2 no puede ser mayor a 5.000';
    }
    else if(this.bet[2] > 4000) {
      error = 'La apuesta 3 no puede ser mayor a 4.000';
    }
    else if(this.bet[3] > 2000) {
      error = 'La apuesta 5 no puede ser mayor a 2.000';
    }
    else if(this.bet[4] > 1000) {
      error = 'La apuesta 10 no puede ser mayor a 1.000';
    }
    else if(this.bet[5] > 500) {
      error = 'La apuesta 20 no puede ser mayor a 500';
    }

    if(error) {
      this.showAlert('Lo siento', error);
    }
    else {
    
      const stopAngle: number = Math.random() * (360 - 0) + 0;
      //this.ruleta.animation.stopAngle = (6.66 * 33) - 3;
      this.girar = true;
      this.reiniciar();
      this.sonido(1);
      this.ruleta.animation.stopAngle   = stopAngle;
      this.ruleta.startAnimation();
      setTimeout( () => {
        this.resultado();
      }, 8000);
      setTimeout( () => {
        this.girar = false;
        this.resetBet();
        this.sonido(2);
      }, 10000);

    }

  }

  reiniciar() {
    this.ruleta.stopAnimation(false);
    this.ruleta.rotationAngle = -3.5;
    this.ruleta.draw();
  }

  resultado() {
    
    let res = this.ruleta.getIndicatedSegment();
    
    if(res.opcion == 1){
      this.sonido(5);
    }
    if(res.opcion == 2){
      this.sonido(2);
    }
    if(res.opcion == 0){
      this.sonido(5);
    }

    this.history.push([
      this.bet[0],
      this.bet[1],
      this.bet[2],
      this.bet[3],
      this.bet[4],
      this.bet[5],
      res.text,
      this.history.length,
    ]);

    this.loadData({
      bet: [
        this.bet[0],
        this.bet[1],
        this.bet[2],
        this.bet[3],
        this.bet[4],
        this.bet[5],
      ],
      result: res.text,
      strake: this.stake
    });
    
  }

  sonido(tipo){
    let mp3 = '../../assets/audio/';
    if(tipo ==1){
      mp3 += 'ruleta_juego.mp3';
    }
    else if(tipo == 2){
      mp3 += 'tick.mp3';
    }
    else if(tipo == 3){
      mp3 += 'ruleta_perdio.mp3';
    }
    else if(tipo == 4){
      mp3 += 'ruleta_gana.mp3';
    }
    else if(tipo == 5){
      mp3 += 'ruleta_coins.mp3';
    }
    else {
      mp3 += 'ruleta_perdio.mp3';
    }
    let audio = new Audio(mp3);
    audio.pause();
    audio.currentTime = 0;
    audio.play();
  }

  crearRuleta(){
    this.ruleta = new Winwheel({
      'rotationAngle'   : -3.5,
      'outerRadius'     : 130,        // Set outer radius so wheel fits inside the background.
      'innerRadius'     : 20,         // Make wheel hollow so segments don't go all way to center.
      'textFontSize'    : 8,         // Set default font size for the segments.
      'textOrientation' : 'vertical', // Make text vertial so goes down from the outside of wheel.
      'textAlignment'   : 'outer',    // Align text to outside of wheel.
      'numSegments'     : 54,         // Specify number of segments.
      'segments'        : [ 
        {'fillStyle' : '#000000', 'text' : 'X2', 'textFontSize' : 10, 'textFillStyle': '#e9ce4d', 'opcion': 1, 'value': 1},
        {'fillStyle' : '#f7cb10', 'text' : '1', 'textFontSize' : 10, 'textFillStyle': '#000000', 'opcion': 0, 'value': 2},
        {'fillStyle' : '#1759b9', 'text' : '2', 'textFontSize' : 10, 'textFillStyle': '#FFFFFF', 'opcion': 2, 'value': 3},
        {'fillStyle' : '#D35400', 'text' : '5', 'textFontSize' : 10, 'textFillStyle': '#FFFFFF', 'opcion': 0, 'value': 4},
        {'fillStyle' : '#f7cb10', 'text' : '1', 'textFontSize' : 10, 'textFillStyle': '#000000', 'opcion': 0, 'value': 5},
        {'fillStyle' : '#1759b9', 'text' : '2', 'textFontSize' : 10, 'textFillStyle': '#FFFFFF', 'opcion': 2, 'value': 6},
        {'fillStyle' : '#1aa019', 'text' : '3', 'textFontSize' : 10, 'textFillStyle': '#FFFFFF', 'opcion': 1, 'value': 7},
        {'fillStyle' : '#f7cb10', 'text' : '1', 'textFontSize' : 10, 'textFillStyle': '#000000', 'opcion': 0, 'value': 8},
        {'fillStyle' : '#00F3FF', 'text' : '10', 'textFontSize' : 10, 'textFillStyle': '#FFFFFF', 'opcion': 2, 'value': 9},
        {'fillStyle' : '#1759b9', 'text' : '2', 'textFontSize' : 10, 'textFillStyle': '#FFFFFF', 'opcion': 0, 'value': 10},
        {'fillStyle' : '#f7cb10', 'text' : '1', 'textFontSize' : 10, 'textFillStyle': '#000000', 'opcion': 2, 'value': 11},
        {'fillStyle' : '#1aa019', 'text' : '3', 'textFontSize' : 10, 'textFillStyle': '#FFFFFF', 'opcion': 0, 'value': 12},
        {'fillStyle' : '#f7cb10', 'text' : '1', 'textFontSize' : 10, 'textFillStyle': '#000000', 'opcion': 1, 'value': 13},
        {'fillStyle' : '#36286b', 'text' : '5000 JIB', 'textFontSize' : 8, 'textFillStyle': '#FFFFFF', 'opcion': 0, 'value': 14},
        {'fillStyle' : '#f7cb10', 'text' : '1', 'textFontSize' : 10, 'textFillStyle': '#000000', 'opcion': 2, 'value': 15},
        {'fillStyle' : '#1759b9', 'text' : '2', 'textFontSize' : 10, 'textFillStyle': '#FFFFFF', 'opcion': 0, 'value': 16},
        {'fillStyle' : '#D35400', 'text' : '5', 'textFontSize' : 10, 'textFillStyle': '#FFFFFF', 'opcion': 2, 'value': 17},
        {'fillStyle' : '#f7cb10', 'text' : '1', 'textFontSize' : 10, 'textFillStyle': '#000000', 'opcion': 0, 'value': 18},
        {'fillStyle' : '#1aa019', 'text' : '3', 'textFontSize' : 10, 'textFillStyle': '#FFFFFF', 'opcion': 1, 'value': 19},
        {'fillStyle' : '#f7cb10', 'text' : '1', 'textFontSize' : 10, 'textFillStyle': '#000000', 'opcion': 0, 'value': 20},
        {'fillStyle' : '#FF00EC', 'text' : '20', 'textFontSize' : 10, 'textFillStyle': '#000000', 'opcion': 2, 'value': 21},
        {'fillStyle' : '#f7cb10', 'text' : '1', 'textFontSize' : 10, 'textFillStyle': '#000000', 'opcion': 0, 'value': 22},
        {'fillStyle' : '#1759b9', 'text' : '2', 'textFontSize' : 10, 'textFillStyle': '#FFFFFF', 'opcion': 2, 'value': 23},
        {'fillStyle' : '#f7cb10', 'text' : '1', 'textFontSize' : 10, 'textFillStyle': '#000000', 'opcion': 0, 'value': 24},
        {'fillStyle' : '#1aa019', 'text' : '3', 'textFontSize' : 10, 'textFillStyle': '#FFFFFF', 'opcion': 1, 'value': 25},
        {'fillStyle' : '#1759b9', 'text' : '2', 'textFontSize' : 10, 'textFillStyle': '#FFFFFF', 'opcion': 0, 'value': 25},
        {'fillStyle' : '#f7cb10', 'text' : '1', 'textFontSize' : 10, 'textFillStyle': '#000000', 'opcion': 2, 'value': 27},
        {'fillStyle' : '#000000', 'text' : 'X5', 'textFontSize' : 10, 'textFillStyle': '#e9ce4d', 'opcion': 0, 'value': 28},
        {'fillStyle' : '#f7cb10', 'text' : '1', 'textFontSize' : 10, 'textFillStyle': '#000000', 'opcion': 2, 'value': 29},
        {'fillStyle' : '#1aa019', 'text' : '3', 'textFontSize' : 10, 'textFillStyle': '#FFFFFF', 'opcion': 0, 'value': 30},
        {'fillStyle' : '#f7cb10', 'text' : '1', 'textFontSize' : 10, 'textFillStyle': '#000000', 'opcion': 1, 'value': 31},
        {'fillStyle' : '#1759b9', 'text' : '2', 'textFontSize' : 10, 'textFillStyle': '#FFFFFF', 'opcion': 0, 'value': 32},
        {'fillStyle' : '#D35400', 'text' : '5', 'textFontSize' : 10, 'textFillStyle': '#FFFFFF', 'opcion': 0, 'value': 33},
        {'fillStyle' : '#f7cb10', 'text' : '1', 'textFontSize' : 10, 'textFillStyle': '#000000', 'opcion': 0, 'value': 34},
        {'fillStyle' : '#1759b9', 'text' : '2', 'textFontSize' : 10, 'textFillStyle': '#FFFFFF', 'opcion': 2, 'value': 35},
        {'fillStyle' : '#00F3FF', 'text' : '10', 'textFontSize' : 10, 'textFillStyle': '#FFFFFF', 'opcion': 0, 'value': 36},
        {'fillStyle' : '#f7cb10', 'text' : '1', 'textFontSize' : 10, 'textFillStyle': '#000000', 'opcion': 1, 'value': 37},
        {'fillStyle' : '#1759b9', 'text' : '2', 'textFontSize' : 10, 'textFillStyle': '#FFFFFF', 'opcion': 0, 'value': 38},
        {'fillStyle' : '#f7cb10', 'text' : '1', 'textFontSize' : 10, 'textFillStyle': '#000000', 'opcion': 2, 'value': 39},
        {'fillStyle' : '#1aa019', 'text' : '3', 'textFontSize' : 10, 'textFillStyle': '#FFFFFF', 'opcion': 0, 'value': 40},
        {'fillStyle' : '#f7cb10', 'text' : '1', 'textFontSize' : 10, 'textFillStyle': '#000000', 'opcion': 2, 'value': 41},
        {'fillStyle' : '#d42116', 'text' : '100 USD', 'textFontSize' : 8, 'textFillStyle': '#FFFFFF', 'opcion': 0, 'value': 42},
        {'fillStyle' : '#f7cb10', 'text' : '1', 'textFontSize' : 10, 'textFillStyle': '#000000', 'opcion': 1, 'value': 43},
        {'fillStyle' : '#1759b9', 'text' : '2', 'textFontSize' : 10, 'textFillStyle': '#FFFFFF', 'opcion': 0, 'value': 44},
        {'fillStyle' : '#f7cb10', 'text' : '1', 'textFontSize' : 10, 'textFillStyle': '#000000', 'opcion': 2, 'value': 45},
        {'fillStyle' : '#1aa019', 'text' : '3', 'textFontSize' : 10, 'textFillStyle': '#FFFFFF', 'opcion': 0, 'value': 46},
        {'fillStyle' : '#1759b9', 'text' : '2', 'textFontSize' : 10, 'textFillStyle': '#FFFFFF', 'opcion': 2, 'value': 47},
        {'fillStyle' : '#FF00EC', 'text' : '20', 'textFontSize' : 10, 'textFillStyle': '#000000', 'opcion': 0, 'value': 48},
        {'fillStyle' : '#D35400', 'text' : '5', 'textFontSize' : 10, 'textFillStyle': '#FFFFFF', 'opcion': 0, 'value': 49},
        {'fillStyle' : '#f7cb10', 'text' : '1', 'textFontSize' : 10, 'textFillStyle': '#000000', 'opcion': 1, 'value': 50},
        {'fillStyle' : '#1759b9', 'text' : '2', 'textFontSize' : 10, 'textFillStyle': '#FFFFFF', 'opcion': 0, 'value': 51},
        {'fillStyle' : '#f7cb10', 'text' : '1', 'textFontSize' : 10, 'textFillStyle': '#000000', 'opcion': 2, 'value': 52},
        {'fillStyle' : '#1aa019', 'text' : '3', 'textFontSize' : 10, 'textFillStyle': '#FFFFFF', 'opcion': 0, 'value': 53},
        {'fillStyle' : '#f7cb10', 'text' : '1', 'textFontSize' : 8, 'textFillStyle': '#000000', 'opcion': 2, 'value': 54},
      ],
      'animation' : {
        'type'     : 'spinToStop',
        //'stopAngle': 100,
        'duration' : 8,    // Duration in seconds.
        'spins'    : 3,     // Default number of complete spins.
        'soundTrigger'     : 'pin',        // Specify pins are to trigger the sound, the other option is 'segment'.
      },
      'pins' :{
        'number'     : 54,   // Number of pins. They space evenly around the wheel.
        'fillStyle'  : 'silver',
        'outerRadius': 1,
      }
    });
  }

  money(value) {
    return this.helper.money(value);
  }

  async showAlert(title: string, message: string) {
    const modal = await this.modal.create({
      component: ModalAlertPage,
      cssClass: 'app-modal modal-alert',
      componentProps: {
        title: title,
        message: message,
        icon: 'alert-outline',
        confirm: 'Cerrar',
        cancel: false
      },
      backdropDismiss: false,
      swipeToClose: false,
      keyboardClose: false,
    });

    await modal.present();

    modal.onDidDismiss().then((success) => {
    
    });
  }

}
