import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Training } from 'src/app/model/training.model';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/model/category.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { max } from 'rxjs';

@Component({
  selector: 'app-training-detail',
  templateUrl: './training-detail.component.html',
  styleUrls: ['./training-detail.component.css'],
})
export class TrainingDetailComponent implements OnInit {
  myForm: FormGroup;
  training: Training;
  error: string = '';
  status: boolean = false;
  urlImg: String = '';
  selectedFile: File | null = null;
  selectedFileName: String = '';
  categories: Category[];
  isUpdateAllowed: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    const defaultCategory = new Category(0, '', '');
    this.training = new Training(0, '', '', 0, 1, '', defaultCategory);
    this.categories = [];
    this.urlImg = environment.host;

    this.myForm = this.formBuilder.group({
      id: [this.training.id],
      name: [this.training.name, Validators.required],
      description: [this.training.description, Validators.required],
      price: [this.training.price, [Validators.required, Validators.min(50)]],
      img: [this.training.img],
      category: [this.training.category, Validators.required],
    });
  }

  ngOnInit(): void {
    this.apiService.getCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => (this.error = err),
    });
    let id = this.route.snapshot.params['id'];
    if (id > 0) {
      this.status = true;
      this.apiService.getTraining(id).subscribe({
        next: (data) => {
          this.training = data;

          this.myForm.setValue({
            id: this.training.id,
            name: this.training.name,
            description: this.training.description,
            price: this.training.price,
            img: this.training.img,
            category: this.training.category,
          });
        },
        error: (err) => (this.error = err),
      });
    }
  }

  /**
   * Navigates to the home page.
   */
  goHome() {
    this.router.navigateByUrl('trainings');
  }

  /**
   * Handles form submission.
   * If status is true, updates the training, otherwise adds a new training.
   * @param form FormGroup instance containing form data.
   */
  onSubmit(form: FormGroup) {
    if (this.status) {
      this.updateTraining(form);
    } else {
      this.onAddTraining(form);
    }
  }

  /**
   * Méthode appelée lorsqu'un fichier est sélectionné par l'utilisateur via un élément d'entrée de type fichier.
   * @param event L'événement déclenché lorsque l'utilisateur sélectionne un fichier.
   */
  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    this.selectedFile = event.target.files[0] as File;
    if (input.files) {
      this.selectedFileName = input.files[0].name;
    }
  }

  /**
   * Méthode de création d'une nouvelle formation avec une image par défaut.
   * @param form comprend le formulaire avec toutes les données saisies par l'utilisateur
   */
  onAddTraining(form: FormGroup) {
    console.log(this.selectedFile);
    if (form.valid) {
      if (this.selectedFile == null) {
        // Si aucun fichier n'est sélectionner.
        this.apiService
          .postTraining({
            name: form.value.name,
            description: form.value.description,
            price: form.value.price,
            quantity: 1,
            img: 'default.jpg',
            category: form.value.category,
          })
          .subscribe({
            next: (data) => console.log(data),
            error: (err) => (this.error = err.message),
            complete: () => this.router.navigateByUrl('trainings'),
          });
      } else {
        this.onAddTrainingWithNewImg(form); // Si un fichier est sélectionner.
      }
    } else this.error = 'Veuillez saisir tous les champs';
  }

  /**
   * Méthode de création d'une nouvelle formation avec une image choisie.
   * @param form comprend le formulaire avec toutes les données saisies par l'utilisateur
   */
  onAddTrainingWithNewImg(form: FormGroup) {
    const formData = new FormData();
    formData.append('file', this.selectedFile as File, this.selectedFile?.name);
    this.apiService.postImg(formData).subscribe(
      (response) => {
        this.apiService
          .postTraining({
            name: form.value.name,
            description: form.value.description,
            price: form.value.price,
            quantity: 1,
            img: this.selectedFileName,
            category: form.value.category,
          })
          .subscribe({
            next: (data) => console.log(data),
            error: (err) => (this.error = err.message),
            complete: () => this.router.navigateByUrl('trainings'),
          });
      },
      (errror) => {
        console.error(errror);
      }
    );
  }

  /**
   * Méthode de mise à jour d'une nouvelle formation avec la même image.
   * @param form comprend le formulaire avec toutes les données saisies par l'utilisateur
   */
  updateTraining(form: FormGroup) {
    if (form.valid) {
      if (this.selectedFile == null) {
        // Si aucun fichier n'est sélectionner donc même image.
        this.apiService
          .postTraining({
            id: form.value.id,
            name: form.value.name,
            description: form.value.description,
            price: form.value.price,
            quantity: 1,
            img: form.value.img,
            category: form.value.category,
          })
          .subscribe({
            next: (data) => console.log(data),
            error: (err) => (this.error = err.message),
            complete: () => this.router.navigateByUrl('trainings'),
          });
      } else this.updateTrainingWithNewImg(form); // Si un fichier est sélectionner donc nouvelle image.
    } else this.error = 'Veuillez saisir tous les champs';
  }

  /**
   * Méthode de mise à jour d'une nouvelle formation avec la même image.
   * @param form comprend le formulaire avec toutes les données saisies par l'utilisateur
   */
  updateTrainingWithNewImg(form: FormGroup) {
    const formData = new FormData();
    formData.append('file', this.selectedFile as File, this.selectedFile?.name);
    this.apiService
      .updateImgTraining(formData, form.value.id)
      .subscribe((response) => {
        console.log(response);
        this.apiService
          .postTraining({
            id: form.value.id,
            name: form.value.name,
            description: form.value.description,
            price: form.value.price,
            quantity: 1,
            img: this.selectedFileName,
            category: form.value.category,
          })
          .subscribe({
            next: (data) => console.log(data),
            error: (err) => (this.error = err.message),
            complete: () => this.router.navigateByUrl('trainings'),
          });
      });
  }

  /**
   * Navigate to the home page.
   */
  navigateToHome() {
    this.router.navigateByUrl('trainings');
  }
}
