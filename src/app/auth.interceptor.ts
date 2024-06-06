import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Récupérer le jeton depuis le localStorage
    const token = localStorage.getItem('authToken');

    // Ajouter le jeton uniquement si disponible
    if (token) {
      // Cloner la requête pour ajouter le jeton dans les en-têtes
      const cloned = req.clone({
        setHeaders: {
          Authorization: token
        }
      });
      // Passer la requête clonée avec les en-têtes d'autorisation
      return next.handle(cloned);
    } else {
      // Passer la requête sans modification
      return next.handle(req);
    }
  }
}
