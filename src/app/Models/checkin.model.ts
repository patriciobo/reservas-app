import { Cliente } from './cliente.model';
import { Domicilio } from './Domicilio.model';

export class CheckIn {
  titular: Cliente;
  datosDomicilio: Domicilio;
  acompanantes: Cliente;
}
