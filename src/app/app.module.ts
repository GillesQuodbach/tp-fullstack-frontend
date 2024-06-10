import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrainingsComponent } from './components/trainings/trainings.component';
import { CartComponent } from './components/cart/cart.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CustomerComponent } from './components/customer/customer.component';
import { OrderComponent } from './components/order/order.component';
import { LoginoutComponent } from './components/loginout/loginout.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OrderConfirmComponent } from './components/order-confirm/order-confirm.component';
import { CardsComponent } from './components/cards/cards.component';
import { TrainingDetailComponent } from './components/training-detail/training-detail.component';
import { SearchComponent } from './components/search/search.component';

import { AuthInterceptor } from './auth.interceptor';

import { RouterModule } from '@angular/router';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    TrainingsComponent,
    CartComponent,
    NotFoundComponent,
    CustomerComponent,
    OrderComponent,
    LoginoutComponent,
    OrderConfirmComponent,
    CardsComponent,
    TrainingDetailComponent,
    SearchComponent,
    OrdersListComponent,
<<<<<<< HEAD
=======
    OrderDetailComponent
>>>>>>> order-detail
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
