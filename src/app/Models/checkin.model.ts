import { BaseClass } from './baseClass.model';
import { Cliente } from './cliente.model';
import { Domicilio } from './domicilio.model';

export class CheckIn extends BaseClass<CheckIn> {
  id: number;
  titular: Cliente;
  datosDomicilio: Domicilio;
  acompanantes: Cliente;
}
