import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/category.model';
import { Training } from 'src/app/model/training.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-training-card',
  templateUrl: './training-card.component.html',
  styleUrls: ['./training-card.component.css']
})
export class TrainingCardComponent implements OnInit {
  listTrainings: Training[] | undefined;
  listCategories: Category[] | undefined;
  error = null;

  @Input() cardTitle = "";
  @Input() btnLabel = "";

    constructor(private cartService: CartService,
      private router: Router,
      private apiService: ApiService,
      public authService: AuthenticateService) { 
    }

    ngOnInit(): void {
      this.getAllTrainings();
    this.getAllCategories();
    }

    getAllCategories() {
      this.apiService.getCategories().subscribe({
        next: (data) => (this.listCategories = data),
        error: (err) => (this.error = err.message),
        complete: () => (this.error = null),
      });
    }
    /**
     * Méthode qui renvoi à partir de l'Api toutes les formations accessibles
     * en cas de problème avec l'api, un message d'erreur sera relayé et affiché
     */
    getAllTrainings() {
      this.apiService.getTrainings().subscribe({
        next: (data) => (this.listTrainings = data),
        error: (err) => (this.error = err.message),
        complete: () => (this.error = null),
      });
    }
}








