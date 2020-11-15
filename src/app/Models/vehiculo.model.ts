import { BaseClass } from './baseClass.model';

export class Vehiculo extends BaseClass<Vehiculo> {
  marca: string;
  modelo: string;
  patente: string;  
}
