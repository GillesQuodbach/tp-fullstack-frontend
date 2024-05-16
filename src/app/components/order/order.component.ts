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
  command : Command = new Command(this.cartService.getAmount(), this.cartService.getCustomer());
  dateOrder : Date = new Date();
  constructor(public cartService : CartService, private router : Router, private apiService: ApiService) { }

  ngOnChanges(changes: SimpleChanges): void {
      console.log('ngOnChanges' + changes);
  }

  ngOnInit(): void {
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
      this.saveCustomer();
      this.cartService.clear();
      this.router.navigateByUrl('');
    }
  }

  saveCustomer() {
    const newCustomer = this.cartService.getCustomer();
    if (newCustomer) {
      this.apiService.postCustomer(newCustomer).subscribe(
        (response) => {
          console.log('Client créé avec succès:', response);
        },
        (error) => {
          console.error('Erreur lors de la création du client: ', error);
        }
      );
    } else {
      console.error('Impossible de créer le client car le client est null.');
    }
  }
  
}
