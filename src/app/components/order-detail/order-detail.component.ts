import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Command } from 'src/app/model/command.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';
import { Customer } from 'src/app/model/customer.model';
import { FormGroup, FormBuilder} from '@angular/forms';
import { Training } from 'src/app/model/training.model';


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
public dateDelivery: Date;
public dateOrder: Date;
myForm: FormGroup;
training: Training | undefined;

  constructor(
    private apiService : ApiService, 
    private router: Router, 
    private route: ActivatedRoute, 
    private authService : AuthenticateService, 
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) {
    this.listStatus = ['Non payé', 'Payé', 'En cours', 'Validée', 'Annulée'];
    this.dateDelivery = new Date();
    this.dateOrder= new Date();

    this.myForm = this.formBuilder.group({
      status: [this.order?.status],
      amount:[this.order?.amount]
    })
   }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    if(id>0) {
      this.getAllTrainings();
      this.getOrderById(id);
      this.getOrderItem(id);
      this.myForm.setValue({
        status:this.order?.status, amount: this.order?.amount
      });
    }

    const today = new Date();
    this.dateDelivery = new Date(today.setDate(today.getDate() + 3));
  }
  
  
  getOrderById(id:number) {
    this.apiService.getOrdersById(id).subscribe({
      next: (data) => (this.order = data), 
      error: (err) => (this.error = err.message)
    })
  }

  getCustomer() {
  }

  getOrderItem(id:number) {
    this.apiService. getOrderItemByOrderId(id).subscribe({
      next:(data) => (console.log(data)),
      error: (err) => (this.error = err.message)
    })
  }

  onSubmit(form:FormGroup){
    console.log(form.value.id);
    console.log(form.value.amount);
  }

  getAllTrainings() {
    this.apiService.getTrainings().subscribe({
      next:(data) => (console.log(data)),
      error: (err) => (this.error = err.message)
    })
  }

}
