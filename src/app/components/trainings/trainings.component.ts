import { Component, Input, OnInit } from '@angular/core';
import { Training } from 'src/app/model/training.model';
import { Category } from 'src/app/model/category.model';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { environment } from 'src/environments/environment';
import { CategoryService } from 'src/app/services/category.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css'],
})

/**
 * Composant de gestion des formations permettant l'affichage et l'ajout dans le panier de formation
 * En fonction de ses roles, l'utilisateur aura + ou - de droits (User ou Admin) dans l'application
 * delors, il aura accès à des fonctionnalités spécifiques suplémentaires
 */
export class TrainingsComponent implements OnInit {
  listTrainings: Training[] | undefined;
  listFiltredTrainings: Training[] | undefined;
  listCategories: Category[] | undefined;
  idCategorySelected: number | undefined;
  nameCategorySelected: string = '';
  error = null;
  urlImg: String = '';
  keyword: string = '';
  isAdmin: boolean;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private apiService: ApiService,
    public authService: AuthenticateService,
    public searchService: SearchService
  ) {
    this.isAdmin = false;
  }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdminToken();
    this.idCategorySelected = this.categoryService.getSelectedIdCategory();
    this.nameCategorySelected = this.categoryService.getSelectedNameCategory();
    if (this.idCategorySelected == 0) {
      this.getAllTrainings();
    } else {
      this.displayTrainingsByCategory(
        this.idCategorySelected,
        this.nameCategorySelected
      );
    }
    this.getAllCategories();
    this.urlImg = environment.host;
    this.searchService.searchKeyword$.subscribe((kw) => {
      this.keyword = kw;
      this.filterTrainings();
    });
  }

  /**
   * Filter trainings based on the keyword.
   */
  filterTrainings() {
    if (this.keyword === '') {
      this.listTrainings = this.listFiltredTrainings; //
    } else {
      this.listTrainings = this.listFiltredTrainings?.filter((training) =>
        training.name.toLowerCase().includes(this.keyword)
      );
    }
  }

  /**
   * Méthode qui renvoi à partir de l'Api toutes les formations accessibles
   * en cas de problème avec l'api, un message d'erreur sera relayé et affiché
   */
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
      next: (data) => (
        (this.listTrainings = data), (this.listFiltredTrainings = data)
      ),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    });
    this.categoryService.clearSelectedIdCategory();
    this.categoryService.clearSelectedNameCategory();
    this.nameCategorySelected = "Toutes";
  }

  /**
   * Méthode permettant uniquement à l'Admin de supprimer une formation de l'ensemble des formations
   * Une fois la formation supprimée dans l'api, la liste des formations est raffraichie
   * @param training
   */
  onDeleteTraining(training: Training) {
    if (confirm('vous êtes sur de vouloir supprimer cette formation')) {
      this.apiService.delTraining(training).subscribe({
        next: (data) => console.log(data),
        error: (err) => (this.error = err.message),
        complete: () => this.getAllTrainings(),
      });
    }
  }

  /**
   * Méthode permettant uniquement à l'Admin de mettre à jour une formation de l'ensemble des formations
   * En renvoyant ici vers le composant dédié à la mise à jour
   * @param training
   */
  onUpdateTraining(event: Event, training: Training) {
    event.preventDefault();
    this.router.navigateByUrl('trainingDetail/' + training.id);
  }

  /**
   * Display trainings by category.
   * @param id ID of the category.
   * @param name Name of the category.
   */
  displayTrainingsByCategory(id: number, name: string) {
    this.apiService.getTrainingsByCategory(id).subscribe({
      next: (data) => (this.listTrainings = data),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    });
    this.categoryService.setSelectedIdCategory(id);
    this.categoryService.setSelectedNameCategory(name);
    this.nameCategorySelected = name;
  }
}
