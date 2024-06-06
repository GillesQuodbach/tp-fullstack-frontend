import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Training } from 'src/app/model/training.model';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';

/**
 * Component for managing a cart, including displaying the cart, removing items, and proceeding to the next step.
 */
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  /**
   * Array containing cart items.
   */
  cart: Training[] | undefined;

  /**
   * Indicates if the cart is empty.
   */
  empty_cart: boolean = false;

  /**
   * Total amount in the cart.
   */
  amount: number = 0;

  /**
   * Error message.
   */
  error: string | undefined;

  /**
   * URL for API.
   */
  urlApi: String = '';

  /**
   * Constructor for CartComponent.
   * @param cartService CartService instance.
   * @param router Router instance.
   * @param authService AuthenticateService instance.
   */
  constructor(
    private cartService: CartService,
    private router: Router,
    private authService: AuthenticateService
  ) {}

  /**
   * Lifecycle hook OnInit.
   */
  ngOnInit(): void {
    this.amount = this.cartService.getAmount();
    this.initCart();
    this.urlApi = environment.host;
  }

  /**
   * Navigate to home page.
   */
  navigateToHome() {
    this.router.navigateByUrl('trainings');
  }

  /**
   * Initialize the cart.
   */
  initCart() {
    this.cart = this.cartService.getCart();
    this.empty_cart = this.cart.length > 0 ? false : true;
  }

  /**
   * Remove a training from the cart.
   * @param training Training object to be removed.
   */
  onRemoveFromCart(training: Training) {
    this.cartService.removeTraining(training);
    this.amount = this.cartService.getAmount();
    this.initCart();
  }

  onNewOrder(){
    if(this.cartService.getSize() > 0) {
      if(this.authService.isConnectedToken()) {
        this.router.navigateByUrl('customer');  
      }
      else this.router.navigateByUrl('login');
    }
    else this.error = 'Panier vide';
  }

  /**
   * Decrease quantity of a training in the cart.
   * @param training Training object whose quantity is to be decreased.
   */
  decreaseQuantity(training: Training) {
    if (training.quantity == 1) {
      this.onRemoveFromCart(training);
    } else {
      training.quantity = training.quantity - 1;
    }
    this.amount = this.cartService.getAmount();
  }

  /**
   * Increase quantity of a training in the cart.
   * @param training Training object whose quantity is to be increased.
   */
  increaseQuantity(training: Training) {
    if (training.quantity == training.capacity) {
      training.quantity = training.capacity;
    } else {
      training.quantity = training.quantity + 1;
    }
    this.amount = this.cartService.getAmount();
  }
}
