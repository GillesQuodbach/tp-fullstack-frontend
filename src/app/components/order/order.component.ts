import { Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Command } from 'src/app/model/command.model';
import { Customer } from 'src/app/model/customer.model';
import { ApiService } from 'src/app/services/api.service';

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
    if (confirm("Aujourd'hui c'est gratuit, merci de votre visite :)")) {
      this.saveOrder();
      this.router.navigateByUrl('');
    }
  }

  saveOrder() {
    if(this.customer) {
      this.apiService.postCustomer(this.customer).subscribe({
        next: (data) => {
          this.apiService.getCustomer(data.id).subscribe({
            next: (customerSaved) => {
              this.apiService.postCommand(new Command(this.cartService.getAmount(), customerSaved)).subscribe();
              this.cartService.clear();
            }
          })
      }});
    }
  }
}
