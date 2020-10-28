import { BaseClass } from './baseClass.model';

export class Tarifa extends BaseClass<Tarifa> {
    fechaDesde: Date;
    fechaHasta: Date;
    precioDia: number;
}