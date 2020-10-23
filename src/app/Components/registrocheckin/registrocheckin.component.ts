import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { CheckIn } from 'src/app/Models/checkin.model';
import { Cliente } from 'src/app/Models/cliente.model';
import { Domicilio } from 'src/app/Models/Domicilio.model';
import { CheckinService } from 'src/app/Services/checkin.service';

@Component({
  selector: 'app-registrocheckin',
  templateUrl: './registrocheckin.component.html',
  styleUrls: ['./registrocheckin.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})
export class RegistrocheckinComponent implements OnInit {

  datosPersonalesForm: FormGroup;
  datosContactoForm: FormGroup;
  datosAcompanantesForm: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _checkinService: CheckinService) { }

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
  }

  registrarCheckIn() {


    let titularCheckin = this.crearTitular(this.datosPersonalesForm.value);
    let domicilio = this.crearDomicilio(this.datosContactoForm.value);
    let acompanantes = this.crearAcompanantes(this.datosAcompanantesForm.value);

    const checkIn: Object = {
      titular: { 
        nombreYApellido: titularCheckin.nombreYApellido,
        dni: titularCheckin.dni,
        correo: titularCheckin.email,
        fechaNacimiento: titularCheckin.fechaNacimiento,
        telefono: titularCheckin.telefono
      },
      datosDomicilio: {
        barrio: domicilio.barrio,
        pais: domicilio.pais,
        provincia: domicilio.provincia,
        calle: domicilio.calle,
        departamento: domicilio.departamento,
        numero: domicilio.numero,
      },
      acompanantes: {
        dni: acompanantes.dni,
        nombreYApellido: acompanantes.nombreYApellido,
        correo: acompanantes.email,
        fechaNacimiento: acompanantes.fechaNacimiento,
        telefono: acompanantes.telefono,
      }
    }

    this._checkinService.guardarCheckin(checkIn);

  }

  crearTitular(clienteTitular: Cliente): Cliente {

    let nombre = this.datosAcompanantesForm.value.Nombre;
    let apellidos = this.datosAcompanantesForm.value.Apellidos;

    const titular: Cliente = {
      dni: clienteTitular.dni,
      nombreYApellido: nombre + " " + apellidos,
      email: clienteTitular.email,
      fechaNacimiento: clienteTitular.fechaNacimiento,
      telefono: clienteTitular.telefono
    }

    return titular;
  }

  crearDomicilio(datosDomicilio: Domicilio): Domicilio {

    const domicilio: Domicilio = {
      barrio: datosDomicilio.barrio,
      pais: datosDomicilio.pais,
      provincia: datosDomicilio.provincia,
      calle: datosDomicilio.calle,
      departamento: datosDomicilio.departamento,
      numero: datosDomicilio.numero,
    }

    return domicilio;
  }

  crearAcompanantes(datosAcompanantes: Cliente): Cliente {

    let nombre = this.datosAcompanantesForm.value.nombre;
    let apellidos = this.datosAcompanantesForm.value.apellidos;

    const acompanante: Cliente = {
      dni: datosAcompanantes.dni,
      nombreYApellido: nombre + " " + apellidos,
      email: datosAcompanantes.email,
      fechaNacimiento: datosAcompanantes.fechaNacimiento,
      telefono: datosAcompanantes.telefono
    }

    return acompanante;
  }

}