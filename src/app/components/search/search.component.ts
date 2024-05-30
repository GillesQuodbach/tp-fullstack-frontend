import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { SearchService } from 'src/app/services/search.service';

/**
 * Component for handling search functionality.
 */
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  /**
   * Constructor for SearchComponent.
   * @param searchService SearchService instance.
   */
  constructor(private searchService: SearchService) {}

  /**
   * Lifecycle hook OnInit.
   */
  ngOnInit(): void {}

  /**
   * Perform a search.
   */
  onSearch() {
    let recherche: string = (
      document.getElementById('rechercheTraining') as HTMLInputElement
    ).value.toLowerCase();
    this.searchService.setKeyword(recherche);
  }
}
