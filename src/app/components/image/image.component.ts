import { ImageService } from './../../services/imageService';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
})
export class ImageComponent implements OnInit {
  imageUrl: SafeUrl | null = null;

  constructor(
    private imageService: ImageService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loadImage('default');
  }

  loadImage(imageName: string): void {
    this.imageService.getImage(imageName).subscribe((blob) => {
      const objectUrl = URL.createObjectURL(blob);
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
    });
  }
}
