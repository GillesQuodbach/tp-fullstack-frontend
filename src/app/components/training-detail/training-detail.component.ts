import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Training } from 'src/app/model/training.model';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/model/category.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-training-detail',
  templateUrl: './training-detail.component.html',
  styleUrls: ['./training-detail.component.css']
})
export class TrainingDetailComponent implements OnInit {
  myForm : FormGroup;
  training : Training;
  error : string = "";
  status : boolean = false;
  urlImg : String = "";
  categories : Category[];

  constructor(
    private formBuilder : FormBuilder,
    private apiService : ApiService,
    private router : Router,
    private route:ActivatedRoute) {

    const defaultCategory = new Category(0, '', '');
    this.training = new Training(0, "", "", 0, 1, "",defaultCategory);
    this.categories = [];
    this.urlImg = environment.host

    this.myForm = this.formBuilder.group({
      id: [this.training.id],
      name: [this.training.name, Validators.required],
      description: [this.training.description, Validators.required],
      price: [this.training.price, [Validators.required, Validators.min(50)]],
      img: [this.training.img],
      category: [this.training.category, Validators.required]
    })
   }

   ngOnInit(): void {
    this.apiService.getCategories().subscribe({
      next:(data) => this.categories = data,
      error: (err) => this.error = err
    })
    let id = this.route.snapshot.params['id'];
    if(id > 0) {
      this.status = true;
      this.apiService.getTraining(id).subscribe({
        next : (data) => {
            this.training = data;
            console.log(this.training);
            this.myForm.setValue({id : this.training.id , name : this.training.name, description : this.training.description, 
              price : this.training.price, img: this.training.img, category : this.training.category});
        },
        error : (err) => this.error = err
      })
    }
  }

  /**
   * Méthode de création d'une nouvelle formation
   * @param form comprend le formulaire avec toutes les données saisies par l'utilisateur
   */
  onAddTraining(form: FormGroup) {
    if(form.valid) {
      if(this.status) this.updateTraining(form);
      else
        this.apiService.postTraining({
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
    }
    else this.error = 'Veuillez saisir tous les champs';
  }

    /**
   * Méthode de mise à jour d'une nouvelle formation
   * @param form comprend le formulaire avec toutes les données saisies par l'utilisateur
   */
    updateTraining(form : FormGroup){
      if(form.valid) {
      this.apiService.postTraining({
        id :form.value.id, 
        name:form.value.name , 
        description:form.value.description,
        price:form.value.price, 
        quantity:1, 
        img: form.value.img,
        category:form.value.category
      })
      .subscribe({
          next : (data) => console.log(data),  
          error : (err) => this.error = err.message,
          complete : () => this.router.navigateByUrl('trainings')
        })
      }
      else this.error = 'Veuillez saisir tous les champs';   
    }
}
