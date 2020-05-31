import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { faMoneyCheckAlt } from '@fortawesome/free-solid-svg-icons';

import { Reserva } from 'src/app/models/reserva';
import { ReservaService } from 'src/app/services/reserva.service';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'form-reserva',
  templateUrl: './form-reserva.component.html',
  styleUrls: ['./form-reserva.component.css'],
  providers: [ReservaService]
})
export class FormReservaComponent implements OnInit {

  faUser = faUser;
  faPhone = faPhone;
  faEnvelope = faEnvelope;
  faUsers = faUsers;
  faIdCard = faIdCard;
  faDollarSign = faDollarSign;
  faMoneyCheckAlt = faMoneyCheckAlt;
  FormReserva: FormGroup;
  CantidadOcupantes: number[] = [1, 2, 3, 4, 5, 6];
  reserva: Reserva;
  fechaDesde: Date;

  constructor(
    private formBuilder: FormBuilder,
    private reservaService: ReservaService,
    private dialogRef: MatDialogRef<FormReservaComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.fechaDesde = data.fechaDesde
  }

  ngOnInit(): void {
    this.FormReserva = this.formBuilder.group({
      Dni: [null],
      ApellidoYNombre: [null],
      Telefono: [null],
      Correo: [null],
      FechaDesde: [this.fechaDesde, null],
      FechaHasta: [null],
      CantOcupantes: [null],
      MontoSenia: [null],
      MontoTotal: [null]
    })
  }

  guardarReserva() {
    this.reserva = new Reserva();
    //this.reserva.Dni = this.FormReserva.value.Dni;
    // this.reserva.ApellidoYNombre = this.FormReserva.value.ApellidoYNombre;
    // this.reserva.Telefono = this.FormReserva.value.Telefono;
    // this.reserva.Correo = this.FormReserva.value.Correo;
    this.reserva.FechaDesde = this.FormReserva.value.FechaDesde;
    this.reserva.FechaHasta = this.FormReserva.value.FechaHasta;
    this.reserva.CantOcupantes = this.FormReserva.value.CantOcupantes;
    this.reserva.MontoSenia = this.FormReserva.value.MontoSenia;
    this.reserva.MontoTotal = this.FormReserva.value.MontoTotal;

    console.log(this.FormReserva.value.FechaDesde);
    console.log(this.FormReserva.value.MontoSenia);
    
    this.FormReserva.reset();
  }

  reservar(){
    this.dialogRef.close();
  }

  cancelar(){
    this.dialogRef.close();
  }

}
