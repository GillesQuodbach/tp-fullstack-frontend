import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private baseUrl = 'http://localhost:8080/fileSystem';

  constructor(private http: HttpClient) {}

  getImage(imageName: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${imageName}`, {
      responseType: 'blob',
    });
  }
}
