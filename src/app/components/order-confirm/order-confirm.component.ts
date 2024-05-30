import { Component, OnInit } from '@angular/core';
import { Command } from 'src/app/model/command.model';
import { Customer } from 'src/app/model/customer.model';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

/**
 * Component for confirming an order.
 */
@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.css'],
})
export class OrderConfirmComponent implements OnInit {
  /**
   * Date of delivery.
   */
  public dateDelivery: Date = new Date();

  /**
   * Constructor for OrderConfirmComponent.
   * @param cartService CartService instance.
   * @param router Router instance.
   */
  constructor(public cartService: CartService, private router: Router) {}

  /**
   * Lifecycle hook OnInit.
   * Sets the delivery date.
   */
  ngOnInit(): void {
    this.dateDelivery.setDate(this.dateDelivery.getDate() + 3);
  }

  /**
   * Navigate to the trainings page.
   */
  navigateToTrainings() {
    this.router.navigateByUrl('trainings');
  }
}
