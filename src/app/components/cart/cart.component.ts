import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Training } from 'src/app/model/training.model';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

/**
 * Composant de gestion d'un panier permettant l'affichage du panier, la suppression éventuelle de formations et le passage à l'étape suivante
 */
export class CartComponent implements OnInit {
  cart : Training[] | undefined;
  empty_cart : boolean = false;
  amount : number = 0;
  error : string | undefined;
  urlApi : String = "";
  constructor(private cartService : CartService , private router : Router, private authService : AuthenticateService) { }

  ngOnInit(): void {
    this.amount = this.cartService.getAmount();
    this.initCart();
    this.urlApi = environment.host;
  }

  navigateToHome() {
    this.router.navigateByUrl('trainings');
  }

  initCart(){
    this.cart = this.cartService.getCart();
    this.empty_cart = (this.cart.length > 0) ? false : true;
  }

  onRemoveFromCart(training : Training){
    this.cartService.removeTraining(training);
    this.amount = this.cartService.getAmount();
    this.initCart();
  }

  onNewOrder(){
    if(this.cartService.getSize() > 0) {
      if(this.authService.isConnected()) {
        this.router.navigateByUrl('customer');  
      }
      else this.router.navigateByUrl('login');
    }
    else this.error = 'Panier vide';
  }

  decreaseQuantity(training: Training) {
    if(training.quantity == 1) {
      this.onRemoveFromCart(training);
    }else {
      training.quantity = training.quantity - 1;
    }
    this.amount = this.cartService.getAmount();
  }

  increaseQuantity(training: Training) {
    if(training.quantity == 10) {
      training.quantity = 10;
    } else {
      training.quantity = training.quantity + 1;
    }
    this.amount = this.cartService.getAmount();
  }
}
