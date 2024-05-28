import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchKeywordSubject = new BehaviorSubject<string>("");
  public searchKeyword$ = this.searchKeywordSubject.asObservable();

  constructor() { }

  setKeyword(kw:string){
    this.searchKeywordSubject.next(kw);
  }

}
