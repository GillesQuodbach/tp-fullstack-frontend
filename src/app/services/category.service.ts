import { Injectable } from '@angular/core';

/**
 * Service for managing selected category.
 */
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  /**
   * ID of the selected category.
   */
  private selectedIdCategory: number;

  /**
   * Name of the selected category.
   */
  private selectedNameCategory: string;

  /**
   * Constructor for CategoryService.
   */
  constructor() {
    this.selectedIdCategory = 0;
    this.selectedNameCategory = 'Toutes';
  }

  /**
   * Get the ID of the selected category.
   * @returns ID of the selected category.
   */
  getSelectedIdCategory(): number {
    return this.selectedIdCategory;
  }

  /**
   * Get the name of the selected category.
   * @returns Name of the selected category.
   */
  getSelectedNameCategory(): string {
    return this.selectedNameCategory;
  }

  /**
   * Set the ID of the selected category.
   * @param id ID of the category to be set.
   */
  setSelectedIdCategory(id: number) {
    this.selectedIdCategory = id;
  }

  /**
   * Set the name of the selected category.
   * @param name Name of the category to be set.
   */
  setSelectedNameCategory(name: string) {
    this.selectedNameCategory = name;
  }

  /**
   * Clear the selected category ID.
   */
  clearSelectedIdCategory() {
    this.selectedIdCategory = 0;
  }

  /**
   * Clear the selected category name.
   */
  clearSelectedNameCategory() {
    this.selectedNameCategory = 'Toutes';
  }
}
