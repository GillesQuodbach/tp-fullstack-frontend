import {
  AfterContentInit,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { Command } from 'src/app/model/command.model';
import { OrderItem } from 'src/app/model/orderItem.model';
import { ApiService } from 'src/app/services/api.service';
import { Route, Router } from '@angular/router';
import { OrderComponent } from '../order/order.component';
import { OrderDetailComponent } from '../order-detail/order-detail.component';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
})
export class OrdersListComponent implements OnInit, AfterViewInit {

  listOrders: Command[] | undefined;
  listFilteredOrders: Command[] | undefined;
  listStatus: string[];
  selectedStatus: string | undefined;
  error = null;
  isAdmin: boolean;

  constructor(private apiService: ApiService, private router : Router ) {
    this.listStatus = ['Non payé', 'Payé', 'En cours', 'Validée', 'Annulée'];
    this.isAdmin = false;
  }

  ngOnInit(): void {
    this.getAllOrders();
  }

  ngAfterViewInit() {
    const allBtns = document.querySelectorAll('.status-btn');
    const tousBtn = document.querySelector('.status-btn-all');
    tousBtn?.classList.add('active');

    allBtns.forEach((btn) =>
      btn.addEventListener('click', (e) => {
        tousBtn?.classList.remove('active');
        allBtns.forEach((btn) => btn.classList.remove('active'));
        const clickedBtn = e.target as HTMLElement;
        clickedBtn.classList.add('active');
      })
    );

    tousBtn?.addEventListener('click', () => {
      allBtns.forEach((btn) => btn.classList.remove('active'));
    });
  }

  getAllOrders() {
    this.apiService.getOrders().subscribe({
      next: (data) => {
        this.listOrders = data;
        this.filterOrders(); // Initialiser la liste filtrée
      },
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    });
  }

  filterOrders() {
    if (this.listOrders) {
      this.listFilteredOrders = this.selectedStatus
        ? this.listOrders.filter(
            (order) => order.status === this.selectedStatus
          )
        : this.listOrders;
    }
  }

  onStatusChange(status: string) {
    this.selectedStatus = status;
    this.filterOrders();
  }

 
  updateOrderStatus(id: number, event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const newStatus = selectElement.value;

    this.apiService.updateOrderStatus(id, newStatus).subscribe({
      next: (updatedCommand) => {
        const index = this.listFilteredOrders?.findIndex(
          (order) => order.id === updatedCommand.id
        );
        if (index !== undefined && index !== -1 && this.listFilteredOrders) {
          this.listFilteredOrders[index] = updatedCommand;
        }
      },
      error: (err) => console.error('Error updating status', err),
    });
  }

     /*ALE*/
     onUpdateOrderDetailById(id: number) {
      this.router.navigateByUrl('orderDetail/' + id);
    }
}



