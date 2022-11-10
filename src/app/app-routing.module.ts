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
    path: 'profile/account',
    loadChildren: () => import('./pages/profile-account/profile-account.module').then( m => m.ProfileAccountPageModule),
    canActivate: [GuardService],
  },
  {
    path: 'profile/edit',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule),
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
    path: 'notifications',
    loadChildren: () => import('./pages/notifications/notifications.module').then( m => m.NotificationsPageModule),
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
  {
    path: 'modal-verified',
    loadChildren: () => import('./modals/modal-verified/modal-verified.module').then( m => m.ModalVerifiedPageModule)
  },
  {
    path: 'modal-sale',
    loadChildren: () => import('./modals/modal-sale/modal-sale.module').then( m => m.ModalSalePageModule),
    canActivate: [GuardService],
  },
  {
    path: 'raffles/:id',
    loadChildren: () => import('./pages/raffles-show/raffles-show.module').then( m => m.RafflesShowPageModule),
    canActivate: [GuardService],
  },
  {
    path: 'raffles/:id/summary',
    loadChildren: () => import('./pages/raffles-summary/raffles-summary.module').then( m => m.RafflesSummaryPageModule),
    canActivate: [GuardService],
  },
  {
    path: 'methods',
    loadChildren: () => import('./pages/methods/methods.module').then( m => m.MethodsPageModule),
    canActivate: [GuardService],
  },
  {
    path: 'methods/add',
    loadChildren: () => import('./pages/methods-add/methods-add.module').then( m => m.MethodsAddPageModule),
    canActivate: [GuardService],
  },
  {
    path: 'beads',
    loadChildren: () => import('./pages/beads/beads.module').then( m => m.BeadsPageModule),
    canActivate: [GuardService],
  },
  {
    path: 'beads/add',
    loadChildren: () => import('./pages/beads-add/beads-add.module').then( m => m.BeadsAddPageModule),
    canActivate: [GuardService],
  },
  {
    path: 'sales',
    loadChildren: () => import('./pages/sales/sales.module').then( m => m.SalesPageModule),
    canActivate: [GuardService],
  },
  {
    path: 'beads/:id/show',
    loadChildren: () => import('./pages/beads-show/beads-show.module').then( m => m.BeadsShowPageModule),
    canActivate: [GuardService],
  },
  {
    path: 'sales/:id/show',
    loadChildren: () => import('./pages/sales-show/sales-show.module').then( m => m.SalesShowPageModule),
    canActivate: [GuardService],
  },
  {
    path: 'balances',
    loadChildren: () => import('./pages/balances/balances.module').then( m => m.BalancesPageModule),
    canActivate: [GuardService],
  },
  {
    path: 'histories',
    loadChildren: () => import('./pages/histories/histories.module').then( m => m.HistoriesPageModule),
    canActivate: [GuardService],
  },
  {
    path: 'recharge',
    loadChildren: () => import('./pages/recharge/recharge.module').then( m => m.RechargePageModule),
    canActivate: [GuardService],
  },
  {
    path: 'policies',
    loadChildren: () => import('./pages/policies/policies.module').then( m => m.PoliciesPageModule)
  },
  {
    path: 'retire',
    loadChildren: () => import('./pages/retire/retire.module').then( m => m.RetirePageModule),
    canActivate: [GuardService],
  },
  {
    path: 'change',
    loadChildren: () => import('./pages/change/change.module').then( m => m.ChangePageModule),
    canActivate: [GuardService],
  },
  {
    path: 'refer',
    loadChildren: () => import('./pages/refer/refer.module').then( m => m.ReferPageModule),
    canActivate: [GuardService],
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
