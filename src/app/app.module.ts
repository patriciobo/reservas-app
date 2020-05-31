import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { DatepickerComponent } from './components/datepicker/datepicker.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FullCalendarModule } from '@fullcalendar/angular';

import { AppComponent } from './app.component';
import { FormReservaComponent } from './components/form-reserva/form-reserva.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MenuComponent } from './components/menu/menu.component';
import { DisponibilidadComponent } from './components/disponibilidad/disponibilidad.component';
import { AppRoutingModule } from './app-routing.module';
import { ConsultaCalendariosComponent } from './components/consulta-calendarios/consulta-calendarios.component';



@NgModule({
  declarations: [
    AppComponent,
    DatepickerComponent,
    FormReservaComponent,
    CalendarComponent,
    MenuComponent,
    DisponibilidadComponent,
    ConsultaCalendariosComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatButtonModule,
    FullCalendarModule,
    MatSelectModule,
    MatToolbarModule,
    MatDividerModule,
    MatStepperModule,
    MatDialogModule,

    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],   
  exports: [],
  providers: [{provide: MatDialogRef, useValue: {}}, {provide: LOCALE_ID, useValue: 'es'}],
  bootstrap: [AppComponent],
  entryComponents: [FormReservaComponent]
})
export class AppModule { }
