import { Component, Input } from '@angular/core';
import { Training } from 'src/app/model/training.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {
  @Input() training: Training | undefined;

  urlImage: String = "";
  showCounter: boolean = false;

  constructor(private router : Router, private cartService : CartService) {}

  ngOnInit(): void {
    this.urlImage = environment.host;
  }

    /**
   * Méthode permettant à tous l'ajout d'une formation au panier en utilisant le service dédié
   * @param training
   */
    onAddToCart(training: Training) {
      if (training.quantity > 0) {
        this.cartService.addTraining(training);
      }
      this.showCounter = true;
      setTimeout(() => {
        this.showCounter = false;
      }, 1000); 
    }

    /**
   * Méthode permettant uniquement à l'Admin de mettre à jour une formation de l'ensemble des formations
   * En renvoyant ici vers le composant dédié à la mise à jour
   * @param training
   */
    onUpdateTraining(training: Training) {
      this.router.navigateByUrl('trainingDetail/' + training.id);
    }
}
