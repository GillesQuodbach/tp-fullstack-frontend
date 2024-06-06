import { Component, OnInit } from '@angular/core';
import { Command } from 'src/app/model/command.model'; 
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  listOrders: Command[] | undefined;
  error = null;


  constructor(
    private apiService : ApiService
  ) { }

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(){
    this.apiService.getOrders().subscribe({
      next: (data) => (this.listOrders=data),
      error: (err) => (this.error = err.message),
      complete: () => (this.error= null),
    })
  }
}
