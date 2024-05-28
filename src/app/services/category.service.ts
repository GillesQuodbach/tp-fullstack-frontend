import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private selectedIdCategory: number;
  private selectedNameCategory: string;
  
  constructor() { 
    this.selectedIdCategory = 0;
    this.selectedNameCategory = "Toutes"
  }

  getSelectedIdCategory(): number {
    return this.selectedIdCategory;
  }

  getSelectedNameCategory(): string {
    return this.selectedNameCategory;
  }

  setSelectedIdCategory(id : number) {
    this.selectedIdCategory = id;
  }

  setSelectedNameCategory(name : string) {
    this.selectedNameCategory = name;
  }

  clearSelectedIdCategory() {
    this.selectedIdCategory = 0;
  }

  clearSelectedNameCategory() {
    this.selectedNameCategory = "Toutes";
  }
}
