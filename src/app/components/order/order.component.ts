import { Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Command } from 'src/app/model/command.model';
import { Customer } from 'src/app/model/customer.model';
import { ApiService } from 'src/app/services/api.service';
import { OrderItem } from 'src/app/model/orderItem.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit,OnChanges,DoCheck,OnDestroy {
  customer : Customer | undefined;
  error : string = "";
  dateOrder : Date = new Date();
  constructor(public cartService : CartService, private router : Router, private apiService: ApiService) { }

  ngOnChanges(changes: SimpleChanges): void {
      console.log('ngOnChanges' + changes);
  }

  ngOnInit(): void {
    this.customer = this.cartService.getCustomer()
      console.log('ngOnInit');
  }

  ngDoCheck(): void {
      console.log('ngDoCheck')
  }

  ngOnDestroy(): void {
      console.log('ngOnDestroy')
  }

  onOrder() {
    if (confirm("Voulez vous confirmer la commande ?")) {
      this.saveOrder();
      this.router.navigateByUrl('orderConfirm'); 
    }
  }

  saveOrder() {
    if(this.customer) {
      this.apiService.postCustomer(this.customer).subscribe({
        next: (data) => {
          this.apiService.getCustomer(data.id).subscribe({
            next: (customerSaved) => {
              this.apiService.postCommand(new Command(0, this.cartService.getAmount(), customerSaved)).subscribe({
                next: (commandSaved) => {
                  this.cartService.setCommand(commandSaved);
                  this.cartService.getCart().map((cartItem) => {
                    this.apiService.postOrderItem(new OrderItem(cartItem.quantity, cartItem.price, commandSaved, cartItem)).subscribe();
                  })
                  this.cartService.clear();
                },
                error: (err) => this.error = err});
            },
            error: (err) => this.error = err});
      },
      error: (err) => this.error = err});
    }
  }
}
