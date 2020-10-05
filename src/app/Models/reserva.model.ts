import { Cliente } from './cliente.model';

export class Reserva {
  cliente: Cliente;
  idCabania: number;
  fechaDesde: Date;
  fechaHasta: Date;
  cantOcupantes: number;
  montoSenia: number;
  montoTotal: number;
}
