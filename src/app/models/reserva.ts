import { Cliente } from './cliente';

export class Reserva {
    Cliente: Cliente;
    FechaDesde: Date;
    FechaHasta: Date;
    CantOcupantes: number;
    MontoSenia: number;
    MontoTotal: number;
}
