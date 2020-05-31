import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DisponibilidadComponent } from './components/disponibilidad/disponibilidad.component';
import { FormReservaComponent } from './components/form-reserva/form-reserva.component';
import { CalendarComponent } from './components/calendar/calendar.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/disponibilidad', pathMatch: 'full' },
    { path: 'disponibilidad', component: DisponibilidadComponent },
    { path: 'reservar', component: FormReservaComponent },
    { path: 'calendarios', component: CalendarComponent },
    { path: '**', redirectTo: '/disponibilidad'}
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule{

}