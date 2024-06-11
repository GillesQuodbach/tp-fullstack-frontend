import { Component } from '@angular/core';
import { AuthenticateService } from './services/authenticate.service';
import { CartService } from './services/cart.service';
import { ApiService } from './services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'trainings-front-app';
  userConected: boolean;
  isAdmin: boolean;

  constructor(
    public cartService: CartService,
    public authService: AuthenticateService,
    private router: Router
  ) {
    this.userConected = false;
    this.isAdmin = false;
  }

  ngOnInit(): void {
    this.userConected = this.authService.isConnectedToken();
    this.isAdmin = this.authService.isAdminToken();
  }

  newTraining(): void {
    this.router.navigateByUrl('trainingDetail/0');
  }
}
