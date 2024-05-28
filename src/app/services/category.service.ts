import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private selectedIdCategory: number;
  
  constructor() { 
    this.selectedIdCategory = 0;
  }

  getSelectedIdCategory(): number {
    return this.selectedIdCategory;
  }

  setSelectedIdCategory(id : number) {
    this.selectedIdCategory = id;
  }

  clearSelectedIdCategory() {
    this.selectedIdCategory = 0;
  }
}
