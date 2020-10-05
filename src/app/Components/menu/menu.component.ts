import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../Services/auth/auth.service';
import { Subscription } from 'rxjs';
import { app } from 'firebase';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean;
  authSubscription: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(
      (authStatus) => (this.isAuthenticated = authStatus)
    );
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
