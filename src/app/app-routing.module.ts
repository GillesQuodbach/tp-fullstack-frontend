import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { TrainingsComponent } from './components/trainings/trainings.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CustomerComponent } from './components/customer/customer.component';
import { OrderComponent } from './components/order/order.component';
import { LoginoutComponent } from './components/loginout/loginout.component';
import { TrainingComponent } from './components/training/training.component';
import { OrderConfirmComponent } from './components/order-confirm/order-confirm.component';
import { TrainingDetailComponent } from './components/training-detail/training-detail.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';


const routes : Routes = [
    { path : 'trainings', component : TrainingsComponent },
    { path : 'cart' , component : CartComponent },
    { 
      path : 'order' , component : OrderComponent,
      canActivate : [UserGuard]
    },
    {
      path : 'orderConfirm', component : OrderConfirmComponent,
      canActivate : [UserGuard]
    },
    {
      path : 'trainingDetail', component : TrainingDetailComponent,
    },
    { 
      path : 'customer' , component : CustomerComponent,
      canActivate : [UserGuard]
    },
    { path : 'login' , component : LoginoutComponent},
    { 
      path : 'training/:id' , component : TrainingComponent,
      canActivate : [UserGuard]
    },
    { 
      path : 'admin' , component : AdminComponent,
      canActivate : [AdminGuard]
    },
    { path : '' , redirectTo : 'trainings', pathMatch : 'full' },
    { path: '404', component: NotFoundComponent},
    { path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
