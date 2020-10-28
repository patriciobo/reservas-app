import { BaseClass } from './baseClass.model';

export class Estado extends BaseClass<Estado> {
    id: number;
    descripcion: string;
    color: string;
    identificador: number;
}