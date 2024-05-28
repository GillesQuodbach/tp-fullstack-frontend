import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(
    private searchService : SearchService
  ) { }

  ngOnInit(): void {
  }

  onSearch(){
    let recherche: string = (document.getElementById("rechercheTraining") as HTMLInputElement).value.toLowerCase();
    this.searchService.setKeyword(recherche);
  }

}