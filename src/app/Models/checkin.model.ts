import { BaseClass } from './baseClass.model';
import { Cliente } from './cliente.model';
import { Domicilio } from './domicilio.model';
import { Vehiculo } from './vehiculo.model';

export class CheckIn extends BaseClass<CheckIn> {
  id: number;
  titular: Cliente;
  datosDomicilio: Domicilio;
  acompanantes: Cliente[];
  vehiculos: Vehiculo[];
}
