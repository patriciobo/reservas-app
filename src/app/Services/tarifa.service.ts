import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Subscription } from 'rxjs';
import { Tarifa } from '../Models/tarifa.model';
import { UIService } from '../Shared/ui.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' // ? 
})
export class TarifaService {

  private tarifas: Tarifa[] = [];
  private firestoreSubscription: Subscription;
  tarifasChanged = new Subject<Tarifa[]>();

  constructor(
    private firestore: AngularFirestore,
    private uiService: UIService
  ) { }

  buscarTarifas() {
    this.uiService.loadingStateChanged.next(true);
    this.firestoreSubscription = this.firestore
      .collection('tarifas')
      .snapshotChanges()
      .pipe(
        map((docArray) => {
          return docArray.map((doc: any) => {
            const tarifa = doc.payload.doc.data();
            const id = doc.payload.doc.id;
            tarifa.id = id;
            tarifa.precioDia = tarifa.precioDia;
            // Parse dates
            tarifa.fechaDesde = tarifa.fechaDesde.toDate();
            tarifa.fechaHasta = tarifa.fechaHasta.toDate();

            return tarifa;
          });
        })
      )
      .subscribe(
        (tarifas: Tarifa[]) => {
          this.tarifas = tarifas;
          this.tarifasChanged.next([...this.tarifas]);
          this.uiService.loadingStateChanged.next(false);
          
          console.log(this.tarifas);

        },
        (error) => {
          this.uiService.showSnackBar(
            error.message,
            null,
            3000
          );
          this.uiService.loadingStateChanged.next(false);
        }
      );
  }
}