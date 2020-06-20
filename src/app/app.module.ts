import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FullCalendarModule } from '@fullcalendar/angular';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { FormReservaComponent } from './calendar/form-reserva/form-reserva.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MenuComponent } from './menu/menu.component';
import { DisponibilidadComponent } from './disponibilidad/disponibilidad.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthService } from './auth/auth.service';
import { ReservaService } from './calendar/reserva.service';
import { UIService } from './shared/ui.service';

import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    FormReservaComponent,
    CalendarComponent,
    MenuComponent,
    DisponibilidadComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FullCalendarModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  exports: [],
  providers: [
    AuthService,
    ReservaService,
    { provide: LOCALE_ID, useValue: 'en-GB' },
    UIService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [FormReservaComponent],
})
export class AppModule {}
