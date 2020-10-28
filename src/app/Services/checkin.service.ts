import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Subscription } from 'rxjs';
import { CheckIn } from '../Models/checkin.model';
import { UIService } from '../Shared/ui.service';

@Injectable({
  providedIn: 'root'
})
export class CheckinService {

  private checkIn: CheckIn[] = [];
  private firestoreSubscription: Subscription;
  checkInChanged = new Subject<CheckIn[]>();

  constructor(
    private firestore: AngularFirestore,
    private uiService: UIService
  ) { }

  guardarCheckin(checkin: CheckIn) {

    this.firestore
      .collection('checkin')
      //tambien podria usarse
      // .add({
      //   titular: checkin.titular,
      //   acompanantes: checkin.acompanantes,
      //   domicilio: checkin.datosDomicilio
      // })
      .add(checkin.toPlainObject())      
      .then((response) =>
        this.uiService.showSnackBar(
          'Se registró el check in con éxito',
          null,
          3000
        )
      )
      .catch((error) =>
        this.uiService.showSnackBar(
          'Ocurrió un error al intentar realizar el check in: ' + error,
          null,
          3000
        )
      );
  }

  parsearCheckInParaFirestore(checkin: CheckIn): object {
    const checkinParseado = checkin;
    checkinParseado.acompanantes = Object.assign(
      {},
      checkinParseado.acompanantes
    );
    checkinParseado.titular = Object.assign(
      {},
      checkinParseado.titular
    );
    checkinParseado.datosDomicilio = Object.assign(
      {},
      checkinParseado.datosDomicilio
    );

    return checkinParseado;
  }

}