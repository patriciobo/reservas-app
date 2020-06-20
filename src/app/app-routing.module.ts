import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DisponibilidadComponent } from './disponibilidad/disponibilidad.component';
import { CalendarComponent } from './calendar/calendar.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth-guard';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'disponibilidad',
    component: DisponibilidadComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'calendario',
    component: CalendarComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/calendario' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
