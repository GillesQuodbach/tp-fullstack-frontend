import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Command } from 'src/app/model/command.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/model/customer.model';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Training } from 'src/app/model/training.model';
import { OrderItem } from 'src/app/model/orderItem.model';


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
order: Command;
customer: Customer | undefined;
training: Training | undefined;
error: string='';
listStatus: string[];
listOrderItems: OrderItem[];
listTrainings: Training[];
public dateDelivery: Date;
public dateOrder: Date;
myForm: FormGroup;
selectedTrainingId: number | undefined;
newOrderItemQuantity: number;

  constructor(
    private apiService : ApiService, 
    private route: ActivatedRoute, 
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.order = new Command(0, 0, new Customer(0, "", "", "", "", ""), "");
    this.newOrderItemQuantity = 1;
    this.listStatus = ['Non payé', 'Payé', 'En cours', 'Validée', 'Annulée'];
    this.listOrderItems = [];
    this.listTrainings = [];
    this.dateDelivery = new Date();
    this.dateOrder= new Date();
    this.myForm = this.formBuilder.group({
      amount:[this.order?.amount, Validators.required],
      status: [this.order?.status, Validators.required]
    })
   }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    if(id>0) {
      this.getAllTrainings();
      this.getOrderById(id);
      this.filterStatus();
      // this.getOrderItem(id);
    }
    const today = new Date();
    this.dateDelivery = new Date(today.setDate(today.getDate() + 3));
  }
  
  
  getOrderById(id:number) {
    this.apiService.getOrdersById(id).subscribe({
      next: (data) => {
        this.order = data;
        this.myForm.setValue({
          amount: this.order?.amount,
          status: this.order?.status
        })
        this.filterStatus();
        this.getOrderItem(data.id);
      },
      error: (err) => {
        (this.error = err.message);
        (this.router.navigateByUrl('404'));
      }
    })
  }

  
  filterStatus(): void {
    if (this.order && this.order.status) {
      this.listStatus = this.listStatus.filter(
        (status) => status !== this.order?.status
      );
      console.log(this.listStatus)
    }
  }

  getOrderItem(id:number) {
    this.apiService.getOrderItemByOrderId(id).subscribe({
      next:(data) => (this.listOrderItems = data),
      error: (err) => (this.error = err.message)
    })
  }

  onSubmit(form:FormGroup){
    if(this.order) {
      this.order.amount = form.value.amount;
      this.order.status = form.value.status;
      this.apiService.postCommand(this.order).subscribe({
          next: (commandSaved) => (console.log(commandSaved)),
          error: (err) => (this.error = err.message),
          complete: () => this.router.navigateByUrl('ordersList')
        })
    }
  }

  getAllTrainings() {
    this.apiService.getTrainings().subscribe({
      next:(data) => (this.listTrainings = data),
      error: (err) => (this.error = err.message)
    })
  }

  deleteOrderItemAndOrder(orderId: number) {
    if(confirm("Êtes-vous sûre de vouloir supprimer cette la commande " + orderId + " ?"))
   this.apiService.deleteOrderItemByOrderId(orderId).subscribe({
    next: () => (console.log("Suppresion des orderItem OK !")),
    error: (err) => (this.error = err.message),
    complete: () => (this.apiService.deleteOrderById(orderId).subscribe({
      next: () => (console.log("Suppression de l'order OK !")),
      error: (err) => (this.error = err.message),
      complete: () => (this.router.navigateByUrl('ordersList'))
    }))
   });
  }
}
  

