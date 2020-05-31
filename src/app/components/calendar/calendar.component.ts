import { Component, OnInit } from '@angular/core';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { Reserva } from '../../models/reserva';
import { ReservaService } from '../../services/reserva.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormReservaComponent } from '../form-reserva/form-reserva.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [ReservaService]
})

export class CalendarComponent implements OnInit {

  calendarPlugins = [dayGridPlugin, interactionPlugin];
  reservas: Reserva[];
  constructor(private reservaService: ReservaService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    
  }

  handleDateClick(arg) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    
    console.log(arg.dateStr)
    dialogConfig.data = {
      fechaDesde: arg.dateStr
    }

    arg.dayEl.style.backgroundColor = 'red';
    this.dialog.open(FormReservaComponent, dialogConfig);
  }

  // handleDateClick(arg) {
  //   arg.dayEl.style.backgroundColor = 'red';
  //   alert(arg.dateStr);
  // }

  handleEventClick(arg) {
    arg.el.style.backgroundColor = 'green';
    alert(arg.event.title);
  }
}
