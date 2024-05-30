import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Service for managing search operations.
 */
@Injectable({
  providedIn: 'root',
})
export class SearchService {
  /**
   * BehaviorSubject for search keyword.
   */
  private searchKeywordSubject = new BehaviorSubject<string>('');

  /**
   * Observable for search keyword.
   */
  public searchKeyword$ = this.searchKeywordSubject.asObservable();

  /**
   * Constructor for SearchService.
   */
  constructor() {}

  /**
   * Set the search keyword.
   * @param kw Keyword to be set.
   */
  setKeyword(kw: string) {
    this.searchKeywordSubject.next(kw);
  }
}
