import { Component } from '@angular/core';
import { AuthenticateService } from './services/authenticate.service';
import { CartService } from './services/cart.service';
import { TrainingsComponent } from './components/trainings/trainings.component';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'trainings-front-app';

  constructor(
    public cartService : CartService, public authService : AuthenticateService,
    public api : ApiService
  ){

  }
  onLogin(){
  }

  onSearch(){
    let recherche: string = (document.getElementById("rechercheTraining") as HTMLInputElement).value;
    this.api.search = recherche;
  }
}
