import { Component, OnInit } from '@angular/core';
import { Command } from 'src/app/model/command.model';
import { Customer } from 'src/app/model/customer.model';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.css']
})
export class OrderConfirmComponent implements OnInit {
  
  public dateDelivery : Date = new Date();

  constructor(public cartService : CartService, private router : Router) {}

  ngOnInit(): void {
    this.dateDelivery.setDate(this.dateDelivery.getDate() + 3)
  }

  
  navigateToTrainings() {
    this.router.navigateByUrl('trainings');  
  }

}
