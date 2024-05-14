import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private users : User[] | undefined;
  userConnected : User = new User("","",[]);

  constructor(private apiService : ApiService) { }

  //renvoi l'utilisateur en locale storage s'il existe sinon un client vide
  getUser(){
    let user = localStorage.getItem('user');    
    if(user){ //si j'ai déjà un utilisateur en LS, c'est que je suis connecté
      this.userConnected = JSON.parse(atob(user));    // décryptage
    }
    return this.userConnected;
  }

  login(email: string) {
    return this.apiService.getUserByEmail(email);
  }

  isConnected() {
    return localStorage.getItem('user') != null; 
  }

  disconnected() {
    localStorage.removeItem('user');
    this.userConnected = new User("","",[]);
  }

  isAdmin() {
    let user = this.getUser();
    if(user.roles.length > 0){
      if(user.roles.indexOf('ADMIN') > -1)  return true;
    }
    return false;
  }

  isUser() {
    let user = this.getUser();
    if(user.roles.length > 0){
      if(user.roles.indexOf('USER') > -1)  return true;
    }
    return false;
  }

  setUser(user : User):any{
    this.userConnected = user;
    localStorage.setItem('user',btoa(JSON.stringify(user)));  //cryptage des données avant stockage en LS
  }
}
