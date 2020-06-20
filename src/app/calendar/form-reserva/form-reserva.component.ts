import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { faMoneyCheckAlt } from '@fortawesome/free-solid-svg-icons';

import { Reserva } from '../reserva.model';
import { Cliente } from '../cliente.model';
import { Evento } from '../evento.model';
import { Constants } from '../../shared/constants';

import { ReservaService } from '../reserva.service';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'form-reserva',
  templateUrl: './form-reserva.component.html',
  styleUrls: ['./form-reserva.component.css'],
  providers: [ReservaService],
})
export class FormReservaComponent implements OnInit {
  faUser = faUser;
  faPhone = faPhone;
  faEnvelope = faEnvelope;
  faUsers = faUsers;
  faHome = faHome;
  faIdCard = faIdCard;
  faDollarSign = faDollarSign;
  faMoneyCheckAlt = faMoneyCheckAlt;

  FormReserva: FormGroup;
  CantidadOcupantes: number[] = [1, 2, 3, 4, 5, 6];
  Cabanias: number[] = [1, 2, 3];

  fechaDesde: Date;
  fechaHastaMinima;

  constructor(
    private formBuilder: FormBuilder,
    private reservaService: ReservaService,
    private dialogRef: MatDialogRef<FormReservaComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.fechaDesde = data.fechaDesde;
  }

  ngOnInit(): void {
    this.buildForm();

    this.limitarFechaHasta();
  }

  buildForm() {
    this.FormReserva = this.formBuilder.group({
      NombreYApellido: [
        ,
        { validators: [Validators.required], updateOn: 'blur' },
      ],
      Dni: [
        ,
        {
          validators: [
            Validators.required,
            Validators.pattern('^[0-9]*$'),
            Validators.minLength(6),
          ],
          updateOn: 'blur',
        },
      ],
      Telefono: [
        ,
        {
          validators: [
            Validators.required,
            Validators.pattern('^[0-9]*$'),
            Validators.minLength(10),
          ],
          updateOn: 'blur',
        },
      ],
      Correo: [null, { updateOn: 'blur' }],
      FechaDesde: [
        this.fechaDesde,
        { validators: [Validators.required], updateOn: 'blur' },
      ],
      FechaHasta: [, { validators: [Validators.required], updateOn: 'blur' }],
      CantOcupantes: [
        ,
        { validators: [Validators.required], updateOn: 'blur' },
      ],
      Cabania: [, { validators: [Validators.required], updateOn: 'blur' }],
      MontoSenia: [
        ,
        {
          validators: [Validators.required, Validators.pattern('^[0-9]*$')],
          updateOn: 'blur',
        },
      ],
      MontoTotal: [
        ,
        {
          validators: [Validators.required, Validators.pattern('^[0-9]*$')],
          updateOn: 'blur',
        },
      ],
    });
  }

  limitarFechaHasta() {
    this.fechaHastaMinima = new Date();
    this.fechaHastaMinima.setDate(this.fechaDesde.getDate() + 1);
  }

  creacrCliente(): Cliente {
    const cliente = new Cliente();
    cliente.dni = this.FormReserva.value.Dni;
    cliente.nombreYApellido = this.FormReserva.value.NombreYApellido;
    cliente.telefono = this.FormReserva.value.Telefono;
    cliente.correo = this.FormReserva.value.Correo;

    return cliente;
  }

  crearReserva(cliente: Cliente): Reserva {
    const reserva = new Reserva();
    reserva.cliente = cliente;
    reserva.fechaDesde = new Date(this.FormReserva.value.FechaDesde);

    reserva.fechaHasta = new Date(this.FormReserva.value.FechaHasta);
    reserva.fechaHasta.setDate(reserva.fechaHasta.getDate() + 1);
    reserva.cantOcupantes = this.FormReserva.value.CantOcupantes;
    reserva.idCabania = this.FormReserva.value.Cabania;

    reserva.montoSenia = this.FormReserva.value.MontoSenia;
    reserva.montoTotal = this.FormReserva.value.MontoTotal;

    return reserva;
  }

  guardarReserva() {
    if (this.FormReserva.valid) {
      const cliente = this.creacrCliente();
      const reserva = this.crearReserva(cliente);
      const color = this.colorDelEvento(reserva.idCabania);

      const event: Evento = {
        title: reserva.idCabania + ' - ' + reserva.cliente.nombreYApellido,
        start: reserva.fechaDesde,
        end: reserva.fechaHasta,
        extendedProps: reserva,
        backgroundColor: color,
      };
      this.reservaService.guardarReserva(event);
      this.dialogRef.close(event);
    }
  }

  colorDelEvento(idCabania: number): string {
    switch (idCabania) {
      case 1:
        return Constants.color1;
      case 2:
        return Constants.color2;
      case 3:
        return Constants.color3;
      default:
        return Constants.color1;
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
