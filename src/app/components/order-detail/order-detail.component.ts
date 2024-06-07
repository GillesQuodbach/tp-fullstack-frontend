import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Command } from 'src/app/model/command.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';
import { Customer } from 'src/app/model/customer.model';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
order: Command | undefined;
customer: Customer | undefined;
error: string='';
listStatus: string[];
 

  constructor(
    private apiService : ApiService, 
    private router: Router, 
    private route: ActivatedRoute, 
    private authService : AuthenticateService, 
    private cartService: CartService
  ) {
    this.listStatus = ['Non payé', 'Payé', 'En cours', 'Validée', 'Annulée'];
   }

  ngOnInit(): void {
   this.getOrderById(1);
  }
  
  
  getOrderById(id:number) {
    this.apiService.getOrdersById(id).subscribe({
      next: (data) => (this.order = data), 
      error: (err) => (this.error = err.message),
    })
  }

  getCustomer() {
  }

}
