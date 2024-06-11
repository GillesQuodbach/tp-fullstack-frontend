import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Training } from 'src/app/model/training.model';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/model/category.model';
import { environment } from 'src/environments/environment';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { CartService } from 'src/app/services/cart.service';
import { HttpClient } from '@angular/common/http';

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
  isAdmin: boolean;
  imageUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticateService,
    private cartService: CartService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {
    const defaultCategory = new Category(0, '');
    this.training = new Training(
      0,
      '',
      '',
      0,
      1,
      40,
      '',
      true,
      defaultCategory
    );

    this.categories = [];
    this.urlImg = environment.host;
    this.isAdmin = false;

    this.myForm = this.formBuilder.group({
      id: [this.training.id],
      name: [this.training.name, Validators.required],
      description: [this.training.description, Validators.required],
      price: [this.training.price, [Validators.required, Validators.min(50)]],
      capacity: [
        this.training.capacity,
        [Validators.required, Validators.min(0)],
      ],
      img: [this.training.img],
      active: [this.training.active, Validators.required],
      category: [
        this.training.id === 0 ? null : this.training.category,
        Validators.required,
      ],
    });
    this.imageUrl = 'assets/img/default.jpg';
  }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdminToken();

    this.apiService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
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
            capacity: this.training.capacity,
            img: this.training.img,
            active: this.training.active,
            category: this.training.category,
          });

          this.imageUrl = this.getTrainingImageUrl();

          this.apiService.getCategories().subscribe({
            next: (data) => {
              (this.categories = data), this.filterCategories();
            },
            error: (err) => (this.error = err),
          });
        },
        error: (err) => (this.error = err),
      });
    } else {
      this.imageUrl = 'assets/img/default.jpg';
    }
  }

  /**
   * Navigates to the home page.
   */
  goHome() {
    this.router.navigateByUrl('trainings');
  }

  getTrainingImageUrl(): string {
    return this.status
      ? `${this.urlImg}/download/${this.training.id}?${new Date().getTime()}`
      : 'assets/img/default.jpg';
  }

  refreshImageUrl(): void {
    this.imageUrl = this.getTrainingImageUrl();
    this.cdr.detectChanges();
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
            capacity: form.value.capacity,
            img: 'default.jpg',
            active: form.value.active,
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
            capacity: form.value.capacity,
            img: this.selectedFileName,
            active: form.value.active,
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
            capacity: form.value.capacity,
            img: form.value.img,
            active: form.value.active,
            category: form.value.category,
          })
          .subscribe({
            next: (data) => {
              console.log(data);
              this.refreshImageUrl();
            },
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
            capacity: form.value.capacity,
            img: this.selectedFileName,
            active: form.value.active,
            category: form.value.category,
          })
          .subscribe({
            next: (data) => console.log(data),
            error: (err) => (this.error = err.message),
            complete: () => this.router.navigateByUrl('trainings'),
          });
      });
  }

  // deleteTraining(training: Training) {
  //   if (confirm('Êtes vous sur de vouloir supprimer cette formation ?')) {
  //     this.apiService.delTraining(training).subscribe({
  //       complete: () => this.router.navigateByUrl('trainings'),
  //     });
  //   }
  // }

  /**
   * Navigate to the home page.
   */
  navigateToHome() {
    this.router.navigateByUrl('trainings');
  }

  onAddToCart(training: Training) {
    if (training.quantity > 0) {
      this.cartService.addTraining(training);
    }
    this.showNotification();
  }

  filterCategories(): void {
    if (this.training && this.training.category) {
      this.categories = this.categories.filter(
        (category) => category.id !== this.training.category.id
      );
    }
  }

  showNotification() {
    const notification = document.getElementById('notification');
    if (notification) {
      notification.classList.add('show');
      setTimeout(() => {
        notification.classList.remove('show');
        notification.classList.add('hide');
        setTimeout(() => {
          notification.classList.remove('hide');
        }, 500);
      }, 2000);
    }
  }
}
