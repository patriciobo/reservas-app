import { Cabana } from './cabana.model';
import { Cliente } from './cliente.model';
import { Estado } from './estado.model';

export class Reserva {
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
