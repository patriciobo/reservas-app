import { BaseClass } from './baseClass.model';
import { Cabana } from './cabana.model';
import { Cliente } from './cliente.model';
import { Domicilio } from './domicilio.model';
import { Evento } from './evento.model';
import { Reserva } from './reserva.model';
import { Vehiculo } from './vehiculo.model';

export class CheckIn extends BaseClass<CheckIn> {
  id: number;
  titular: Cliente;
  datosDomicilio: Domicilio;
  acompanantes: Cliente[];
  vehiculos: Vehiculo[];
  evento: Evento;
}
