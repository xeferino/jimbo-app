/**
 *
 * @fileoverview AppRoutingModule
 *
 * @version 1.0
 *
 * @author Milan Gotera <milangotera@gmail.com>
 *
 */

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GuardService } from './services/auth/guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'forgot',
    loadChildren: () => import('./pages/forgot/forgot.module').then( m => m.ForgotPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [GuardService],
  },
  {
    path: 'setting',
    loadChildren: () => import('./pages/setting/setting.module').then( m => m.SettingPageModule),
    canActivate: [GuardService],
  },
  {
    path: 'roulette',
    loadChildren: () => import('./pages/roulette/roulette.module').then( m => m.RoulettePageModule),
    canActivate: [GuardService],
  },
  {
    path: 'winners',
    loadChildren: () => import('./pages/winners/winners.module').then( m => m.WinnersPageModule),
    canActivate: [GuardService],
  },
  {
    path: 'modal-countries',
    loadChildren: () => import('./modals/modal-countries/modal-countries.module').then( m => m.ModalCountriesPageModule),
  },
  {
    path: 'modal-alert',
    loadChildren: () => import('./modals/modal-alert/modal-alert.module').then( m => m.ModalAlertPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
