import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Subject, Subscription, Observable, BehaviorSubject } from 'rxjs';
import { map, take, switchMap } from 'rxjs/operators';

import { Evento } from './evento.model';
import { UIService } from '../shared/ui.service';

@Injectable()
export class ReservaService {
  private eventos: Evento[] = [];
  private firestoreSubscription: Subscription;
  eventosChanged = new Subject<Evento[]>();

  constructor(
    private firestore: AngularFirestore,
    private uiService: UIService
  ) {}

  buscarEventos() {
    this.uiService.loadingStateChanged.next(true);
    this.firestoreSubscription = this.firestore
      .collection('eventos')
      .snapshotChanges()
      .pipe(
        map((docArray) => {
          return docArray.map((doc: any) => {
            const evento = doc.payload.doc.data();
            const id = doc.payload.doc.id;
            evento.id = id;
            // Parse dates
            evento.start = evento.start.toDate();
            evento.end = evento.end.toDate();
            evento.extendedProps.fechaDesde = evento.extendedProps.fechaDesde.toDate();
            evento.extendedProps.fechaHasta = evento.extendedProps.fechaHasta.toDate();
            return evento;
          });
        })
      )
      .subscribe(
        (eventos: Evento[]) => {
          this.eventos = eventos;
          this.eventosChanged.next([...this.eventos]);
          this.uiService.loadingStateChanged.next(false);
        },
        (error) => {
          this.uiService.showSnackBar(
            'Hubo un error al intentar obtener los eventos, por favor intente de nuevo',
            null,
            3000
          );
          this.uiService.loadingStateChanged.next(false);
        }
      );
  }

  verificarDisponibilidad(
    fechaDesde: Date,
    fechaHasta: Date,
    idCabania: number
  ): boolean {
    const eventosSuperpuestos = this.eventos.filter(
      (e) =>
        ((e.start <= fechaDesde && fechaDesde < e.end) ||
          (fechaDesde <= e.start && e.start < fechaHasta)) &&
        e.extendedProps.idCabania === idCabania
    );
    return eventosSuperpuestos.length === 0 ? true : false;
  }

  guardarReserva(evento: Evento) {
    const eventoParseado = this.parsearEventoParaFirestore(evento);
    this.firestore.collection('eventos').add(eventoParseado);
  }

  parsearEventoParaFirestore(evento: Evento): object {
    const eventoParseado = evento;
    eventoParseado.extendedProps.cliente = Object.assign(
      {},
      eventoParseado.extendedProps.cliente
    );
    eventoParseado.extendedProps = Object.assign(
      {},
      eventoParseado.extendedProps
    );
    return eventoParseado;
  }

  cancelarSuscripciones() {
    if (this.firestoreSubscription) {
      this.firestoreSubscription.unsubscribe();
    }
  }
}
