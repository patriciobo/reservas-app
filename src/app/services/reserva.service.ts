import { Injectable } from '@angular/core';
import { Reserva } from '../models/reserva';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  cliente: Cliente = {
    Dni: 37489749,
    ApellidoYNombre: "Bonetto Patricio",
    Telefono: "3517642289",
    Correo: "patricio.bonetto@outlook.com" };

  reservas: Reserva[] = [
    {
      Cliente: this.cliente,
      FechaDesde: new Date("2020-05-20"),
      FechaHasta: new Date("2020-05-30"),
      CantOcupantes: 4,
      MontoSenia: 500,
      MontoTotal: 2000
    },
    {
      Cliente: this.cliente,
      FechaDesde: new Date("2020-05-25"),
      FechaHasta: new Date("2020-06-7"),
      CantOcupantes: 4,
      MontoSenia: 500,
      MontoTotal: 2000
    }
  ];
  constructor() { }

  getReservas(){
    return this.reservas.slice();
  }

  
}
