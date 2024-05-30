import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Service for handling image-related operations.
 */
@Injectable({
  providedIn: 'root',
})
export class ImageService {
  /**
   * Base URL for the image service.
   */
  private baseUrl = 'http://localhost:8080/fileSystem';

  /**
   * Constructor for ImageService.
   * @param http HttpClient instance.
   */
  constructor(private http: HttpClient) {}

  /**
   * Get an image by its name.
   * @param imageName Name of the image to be fetched.
   * @returns Observable with Blob data type.
   */
  getImage(imageName: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${imageName}`, {
      responseType: 'blob',
    });
  }
}
