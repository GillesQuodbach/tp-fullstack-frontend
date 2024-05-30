import { Component } from '@angular/core';                                                                        
import { AuthenticateService } from './services/authenticate.service';
import { CartService } from './services/cart.service';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'trainings-front-app';
  userConected : boolean;
  isAdmin : boolean;

  constructor(
    public cartService : CartService, public authService : AuthenticateService
  ){
    this.userConected = false;
    this.isAdmin = false;
  }

  ngOnInit(): void {
    this.userConected = this.authService.isConnected();
    this.isAdmin = this.authService.isAdmin();
  }

  onLogin(){
  }
}
