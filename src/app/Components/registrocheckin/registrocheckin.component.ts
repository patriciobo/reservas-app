import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { CheckIn } from 'src/app/Models/checkin.model';
import { CheckinService } from 'src/app/Services/checkin.service';
import { UIService } from 'src/app/Shared/ui.service';
import { Cliente } from 'src/app/Models/cliente.model';
import { Vehiculo } from 'src/app/Models/vehiculo.model';

@Component({
  selector: 'app-registrocheckin',
  templateUrl: './registrocheckin.component.html',
  styleUrls: ['./registrocheckin.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})
export class RegistrocheckinComponent implements OnInit {

  datosPersonalesForm: FormGroup;
  datosContactoForm: FormGroup;
  datosAcompanantesForm: FormGroup;
  datosVehiculosForm: FormGroup;

  acompanantes: Cliente[] = [];
  vehiculos: Vehiculo[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _checkinService: CheckinService,
    private uiService: UIService) { }

  ngOnInit() {

    this.datosPersonalesForm = this._formBuilder.group({
      nombre: [],
      apellidos: [],
      dni: [],
      telefono: [],
      email: [],
      fechaNacimiento: [],
    });
    this.datosContactoForm = this._formBuilder.group({
      pais: [],
      provincia: [],
      barrio: [],
      calle: [],
      numero: [],
      departamento: [],
    });
    this.datosAcompanantesForm = this._formBuilder.group({
      nombre: [],
      apellidos: [],
      dni: [],
      fechaNacimiento: [],
    });
    this.datosVehiculosForm = this._formBuilder.group({
      marca: [],
      modelo: [],
      patente: [],
    });
  }

  registrarCheckIn() {

    let checkIn = new CheckIn();

    checkIn.titular = this.datosPersonalesForm.value;
    checkIn.datosDomicilio = this.datosContactoForm.value;
    checkIn.acompanantes = this.acompanantes;
    checkIn.vehiculos = this.vehiculos;

    this._checkinService.guardarCheckin(checkIn);

  }

  agregarAcompanante() {

    const persona = this.datosAcompanantesForm.value;
    this.acompanantes.push(persona);

    this.datosAcompanantesForm.reset();
    this.uiService.showSnackBar(
      'La persona se agregó con éxito.',
      null,
      3000
    );

  }

  agregarVehiculo() {

    const vehiculo = this.datosVehiculosForm.value;
    this.vehiculos.push(vehiculo);

    this.datosVehiculosForm.reset();
    this.uiService.showSnackBar(
      'El vehículo se agregó con éxito.',
      null,
      3000
    );
  }

  quitarVehiculo(vehiculo) {
    const index: number = this.vehiculos.indexOf(vehiculo);

    if (index !== -1) {
      this.vehiculos.splice(index, 1);
    }

    this.uiService.showSnackBar(
      'El vehículo se quitó de la lista.',
      null,
      3000
    );

  }

  quitarAcompanante(acompanante) {
    const index: number = this.acompanantes.indexOf(acompanante);

    if (index !== -1) {
      this.acompanantes.splice(index, 1);
    }

    this.uiService.showSnackBar(
      'La persona se quitó de la lista.',
      null,
      3000
    );

  }

}