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

  guardarCheckin(checkin: Object) {
    console.log(checkin);
    this.firestore
      .collection('checkin')
      .add(checkin)
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
}