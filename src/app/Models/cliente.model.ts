import { BaseClass } from './baseClass.model';

export class Cliente extends BaseClass<Cliente> {
  dni: number;
  nombreYApellido: string;
  telefono?: number;
  correo?: string;
  fechaNacimiento?: Date;
  
}
