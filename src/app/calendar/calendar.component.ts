import {
  Component,
  OnInit,
  ViewEncapsulation,
  OnDestroy,
  AfterViewChecked,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { FormReservaComponent } from './form-reserva/form-reserva.component';

import { ReservaService } from './reserva.service';
import { UIService } from '../shared/ui.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [ReservaService],
  encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent implements OnInit, AfterViewChecked, OnDestroy {
  isLoading = false;
  events = [];
  eventosSubscription: Subscription;
  isLoadingSubscription: Subscription;

  cabania1Checked = true;
  cabania2Checked = true;
  cabania3Checked = true;

  calendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventDisplay: 'block',
    locale: 'es',
    timeZone: 'local',
    editable: true,
    buttonText: { today: 'Hoy' },
    aspectRatio: 1.2,
    events: this.events,
    eventOrder: 'title',
    displayEventTime: false,
    fixedWeekCount: false,
  };

  constructor(
    public dialog: MatDialog,
    private reservaService: ReservaService,
    private uiService: UIService
  ) {}

  ngOnInit(): void {
    this.isLoadingSubscription = this.uiService.loadingStateChanged.subscribe(
      (isLoading) => (this.isLoading = isLoading)
    );
    this.eventosSubscription = this.reservaService.eventosChanged.subscribe(
      (eventos) => {
        this.events = eventos;
        this.calendarOptions.events = this.events;
      }
    );
    this.reservaService.buscarEventos();
  }

  ngAfterViewChecked() {
    if (!this.isLoading && this.isLoadingSubscription) {
      this.isLoadingSubscription.unsubscribe();
    }
  }

  handleDateClick(arg) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      isEditing: false,
      fechaDesde: arg.date,
    };

    // arg.dayEl.style.backgroundColor = 'red';
    this.dialog.open(FormReservaComponent, dialogConfig);
  }

  handleEventClick(calEventInfo) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      isEditing: true,
      event: calEventInfo.event,
    };

    this.dialog.open(FormReservaComponent, dialogConfig);
    // const oldColor = calEvent.el.style.backgroundColor;
    // console.log(oldColor);
    //calEvent.el.style.backgroundColor = '#ff4081';
  }

  filtrarCabania(event, id) {
    if (id === 0) {
      this.calendarOptions.events = this.events;
    } else {
      this.calendarOptions.events = this.events
        .filter((evento) => evento.extendedProps.idCabania === id)
        .slice();
    }
  }

  checkCabania1() {
    this.cabania1Checked = !this.cabania1Checked;
    if (this.cabania1Checked) {
      this.calendarOptions.events = this.calendarOptions.events.concat(
        this.events
          .filter((event) => event.extendedProps.idCabania === 1)
          .slice()
      );
    } else {
      this.calendarOptions.events = this.calendarOptions.events
        .filter((event) => event.extendedProps.idCabania !== 1)
        .slice();
    }
  }

  checkCabania2() {
    this.cabania2Checked = !this.cabania2Checked;
    if (this.cabania2Checked) {
      this.calendarOptions.events = this.calendarOptions.events.concat(
        this.events
          .filter((event) => event.extendedProps.idCabania === 2)
          .slice()
      );
    } else {
      this.calendarOptions.events = this.calendarOptions.events
        .filter((event) => event.extendedProps.idCabania !== 2)
        .slice();
    }
  }

  checkCabania3() {
    this.cabania3Checked = !this.cabania3Checked;
    if (this.cabania3Checked) {
      this.calendarOptions.events = this.calendarOptions.events.concat(
        this.events
          .filter((event) => event.extendedProps.idCabania === 3)
          .slice()
      );
    } else {
      this.calendarOptions.events = this.calendarOptions.events
        .filter((event) => event.extendedProps.idCabania !== 3)
        .slice();
    }
  }

  ngOnDestroy(): void {
    if (this.eventosSubscription) {
      this.eventosSubscription.unsubscribe();
    }
    if (this.isLoadingSubscription) {
      this.isLoadingSubscription.unsubscribe();
    }
    this.reservaService.cancelarSuscripciones();
  }
}
