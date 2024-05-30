import {
  Component,
  DoCheck,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Command } from 'src/app/model/command.model';
import { Customer } from 'src/app/model/customer.model';
import { ApiService } from 'src/app/services/api.service';
import { OrderItem } from 'src/app/model/orderItem.model';

/**
 * Component for managing an order.
 */
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit, OnChanges, DoCheck, OnDestroy {
  /**
   * Customer object.
   */
  customer: Customer | undefined;

  /**
   * Error message.
   */
  error: string = '';

  /**
   * Date of the order.
   */
  dateOrder: Date = new Date();

  /**
   * Constructor for OrderComponent.
   * @param cartService CartService instance.
   * @param router Router instance.
   * @param apiService ApiService instance.
   */
  constructor(
    public cartService: CartService,
    private router: Router,
    private apiService: ApiService
  ) {}

  /**
   * Lifecycle hook OnChanges.
   */
  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges' + changes);
  }

  /**
   * Lifecycle hook OnInit.
   * Initializes the customer.
   */
  ngOnInit(): void {
    this.customer = this.cartService.getCustomer();
    console.log('ngOnInit');
  }

  /**
   * Lifecycle hook DoCheck.
   */
  ngDoCheck(): void {
    console.log('ngDoCheck');
  }

  /**
   * Lifecycle hook OnDestroy.
   */
  ngOnDestroy(): void {
    console.log('ngOnDestroy');
  }

  /**
   * Place the order.
   * If confirmed, saves the order and navigates to the order confirmation page.
   */
  onOrder() {
    if (confirm('Do you want to confirm the order?')) {
      this.saveOrder();
      this.router.navigateByUrl('orderConfirm');
    }
  }

  /**
   * Saves the order.
   */
  saveOrder() {
    if (this.customer) {
      this.apiService.postCustomer(this.customer).subscribe({
        next: (data) => {
          this.apiService.getCustomer(data.id).subscribe({
            next: (customerSaved) => {
              this.apiService
                .postCommand(
                  new Command(0, this.cartService.getAmount(), customerSaved)
                )
                .subscribe({
                  next: (commandSaved) => {
                    this.cartService.setCommand(commandSaved);
                    this.cartService.getCart().map((cartItem) => {
                      this.apiService
                        .postOrderItem(
                          new OrderItem(
                            cartItem.quantity,
                            cartItem.price,
                            commandSaved,
                            cartItem
                          )
                        )
                        .subscribe();
                    });
                    this.cartService.clear();
                  },
                  error: (err) => (this.error = err),
                });
            },
            error: (err) => (this.error = err),
          });
        },
        error: (err) => (this.error = err),
      });
    }
  }
}
