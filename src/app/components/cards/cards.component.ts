import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { Training } from 'src/app/model/training.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {
  @Input() training: Training | undefined;

  urlImage: String = "";
  showCounter: boolean = false;
  fileInput: boolean = false;
  validateBtnFile: boolean = false;
  selectedFile: File | null = null; 
  isAdmin: boolean;

  constructor(private router : Router, private cartService : CartService, private authService : AuthenticateService, private apiService: ApiService, private cdr: ChangeDetectorRef) {
    this.isAdmin = false;
  }

  ngOnInit(): void {
    if(this.training) {
      this.urlImage = environment.host + '/download/' + this.training.id;
    }
    this.isAdmin = this.authService.isAdmin();
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

    showFileInput() {
      this.fileInput = true;
    }

    onFileSelected(event:any) {
      const file = event.target.files[0];
      if (file) {
        console.log('Fichier sélectionné:', file);
        this.validateBtnFile = true;
        this.selectedFile = event.target.files[0] as File;
      }
    }

    updateImg(id: number) {
      if(this.training) {}
      const formData = new FormData();
      formData.append('file', this.selectedFile as File, this.selectedFile?.name);
      this.apiService.updateImgTraining(formData, id).subscribe((response) => {
        if(this.training) {
          this.urlImage = environment.host + '/download/' + this.training.id + '?' + new Date().getTime();
          this.cdr.detectChanges();
          this.validateBtnFile = false;
          this.fileInput = false;
        }
      })
    }

}
