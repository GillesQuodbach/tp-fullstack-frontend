import { Component, OnInit } from '@angular/core';
import { Command } from 'src/app/model/command.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
})
export class OrdersListComponent implements OnInit {
  listOrders: Command[] | undefined;
  listFilteredOrders: Command[] | undefined;
  listStatus: string[];
  selectedStatus: string | undefined;
  error = null;

  constructor(private apiService: ApiService) {
    this.listStatus = ['Non payé', 'Payé', 'En cours', 'Validée', 'Annulée'];
  }

  ngOnInit(): void {
    this.getAllOrders();
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
}
