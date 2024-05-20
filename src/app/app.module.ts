import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrainingsComponent } from './components/trainings/trainings.component';
import { CartComponent } from './components/cart/cart.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CustomerComponent } from './components/customer/customer.component';
import { OrderComponent } from './components/order/order.component';
import { LoginoutComponent } from './components/loginout/loginout.component';
import { TrainingComponent } from './components/training/training.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminComponent } from './components/admin/admin.component';
import { OrderConfirmComponent } from './components/order-confirm/order-confirm.component';
<<<<<<< HEAD
import { TrainingCardComponent } from './components/training-card/training-card.component';
=======
import { ImageComponent } from './components/image/image.component';
>>>>>>> bf464ff6b4fa1e7d92a7a078a335f45ce15cd68f

@NgModule({
  declarations: [
    AppComponent,
    TrainingsComponent,
    CartComponent,
    NotFoundComponent,
    CustomerComponent,
    OrderComponent,
    LoginoutComponent,
    TrainingComponent,
    AdminComponent,
    OrderConfirmComponent,
<<<<<<< HEAD
    TrainingCardComponent
=======
    ImageComponent
>>>>>>> bf464ff6b4fa1e7d92a7a078a335f45ce15cd68f
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
