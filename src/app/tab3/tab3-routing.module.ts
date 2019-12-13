import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab3Page } from './tab3.page';

const routes: Routes = [
  {
    path: '',
    component: Tab3Page
  },
  {
    path: 'waiting',
    loadChildren: () => import('./waiting/waiting.module').then( m => m.WaitingPageModule)
  },
  {
    path: 'confirmed',
    loadChildren: () => import('./confirmed/confirmed.module').then( m => m.ConfirmedPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab3PageRoutingModule {}
