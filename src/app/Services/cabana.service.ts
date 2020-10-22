import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cabana } from '../Models/cabana.model';
import { UIService } from '../Shared/ui.service';

@Injectable({
  providedIn: 'root'
})
export class CabanaService {

  private cabanas: Cabana[] = [];
  private firestoreSubscription: Subscription;
  cabanasChanged = new Subject<Cabana[]>();

  constructor(
    private firestore: AngularFirestore,
    private uiService: UIService
  ) { }

  obtenerCabanias() {
    this.uiService.loadingStateChanged.next(true);
    this.firestoreSubscription = this.firestore
      .collection('cabanias')
      .snapshotChanges()
      .pipe(
        map((docArray) => {
          return docArray.map((doc: any) => {
            const cabana = doc.payload.doc.data();
            const id = doc.payload.doc.id;
            
            cabana.id = id;
            cabana.numero = cabana.numero;
            cabana.nombre = cabana.nombre;

            return cabana;
          });
        })
      )
      .subscribe(
        (cabanas: Cabana[]) => {
          this.cabanas = cabanas;
          this.cabanasChanged.next([...this.cabanas]);
          this.uiService.loadingStateChanged.next(false);
        },
        (error) => {
          this.uiService.showSnackBar(
            'Hubo un error al intentar obtener las cabañas, por favor intente de nuevo',
            null,
            3000
          );
          this.uiService.loadingStateChanged.next(false);
        }
      );
  }

}

