import { Cabana } from './cabana.model';
import { Cliente } from './cliente.model';
import { Estado } from './estado.model';
import { BaseClass } from './baseClass.model';

export class Reserva extends BaseClass<Reserva> {
  fechaCreacion: Date;
  cliente: Cliente;
  idCabania: number;
  fechaDesde: Date;
  fechaHasta: Date;
  cantOcupantes: number;
  montoSenia: number;
  montoTotal: number;
  estado: Estado;
  cabana: Cabana;
}
