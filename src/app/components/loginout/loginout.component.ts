import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/services/api.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-loginout',
  templateUrl: './loginout.component.html',
  styleUrls: ['./loginout.component.css']
})

/**
 * Composant de gestion de l'authentification d'un utilisateur
 */
export class LoginoutComponent implements OnInit {
  myForm : FormGroup;
  user : User | undefined;
  error : string | undefined;
  connected : boolean = false;
  
  constructor(private formBuilder : FormBuilder, public authService : AuthenticateService, private router : Router, private apiService : ApiService) { 
    this.user = authService.getUser(); 
    this.connected = authService.isConnectedToken();
    this.myForm = this.formBuilder.group({
      email : [this.user.email, [Validators.required,Validators.pattern(environment.regExEmail)]],
      password : [this.user.password, [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.user = new User("","",[]);
  }

  /**
   * Méthode de demande d'authentification à partir des credentials (login + pwd) saisis et comparer avec l'api 
   * En cas de succès, la session de l'utilisateur reste jusqu'à la déconnexion
   * @param form 
   */
  // onLogin(form : FormGroup){
  //   if(form.valid){
  //     this.authService.login(form.value.email).subscribe({
  //       next : (data) => {
  //           this.user = data[0];
  //           if((this.user.email == form.value.email) && (this.user.password == form.value.password)){
  //               this.authService.setUser(this.user);
  //               this.router.navigateByUrl('cart');
  //           }
  //           else this.error = "Email or Password incorrecte";     //ToDo tester tous les cas
  //         },
  //       error : (err) => this.error = err.message,  //pb sur la requete
  //       complete : () => console.log("Welcome")
  //     })
  //   }
  //   else this.error = 'Erreur de saisie';
  // }

  onLogin(myForm: FormGroup) {
    this.apiService.getToken(myForm.value.email, myForm.value.password).subscribe({
      next: response => {
        const token = response.headers.get('Authorization');
        console.log(token);
        if (token) {
          this.authService.setToken(token);
          this.router.navigateByUrl('cart');
        } else {
          console.error('Token non trouvé dans les en-têtes de la réponse.');
        }
      },
      error: err => {
        this.error = "Email ou mot de passe incorrect"
      }
    });
  }

  /**
   * ToDo Ajouter un nouvel utilisateur
   */
  onAddUser(){
  }

  /**
   * Méthode de déconnexion d'un utilisateur
   */
  disconnect(){
    this.authService.disconnectedToken();
    this.connected = false;
    this.router.navigateByUrl('trainings');
  }
}
