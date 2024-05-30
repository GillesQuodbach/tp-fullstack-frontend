import { ImageService } from './../../services/imageService';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

/**
 * Component for displaying images securely.
 */
@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
})
export class ImageComponent implements OnInit {
  /**
   * Safe URL for the image.
   */
  imageUrl: SafeUrl | null = null;

  /**
   * Constructor for ImageComponent.
   * @param imageService ImageService instance.
   * @param sanitizer DomSanitizer instance.
   */
  constructor(
    private imageService: ImageService,
    private sanitizer: DomSanitizer
  ) {}

  /**
   * Lifecycle hook OnInit.
   * Loads the default image.
   */
  ngOnInit(): void {
    this.loadImage('default');
  }

  /**
   * Loads an image by its name securely.
   * @param imageName Name of the image to be loaded.
   */
  loadImage(imageName: string): void {
    this.imageService.getImage(imageName).subscribe((blob) => {
      const objectUrl = URL.createObjectURL(blob);
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
    });
  }
}
