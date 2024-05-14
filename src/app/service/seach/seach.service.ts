import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchTermSubject = new BehaviorSubject<string>('');
  searchTerm$ = this.searchTermSubject.asObservable();
  private filterItemSubject = new BehaviorSubject<string>('');
  filterItem$ = this.filterItemSubject.asObservable();

  constructor() { }

  setFilterTerm(filterTerm: string): void {

    this.filterItemSubject.next(filterTerm);
  }

  setSearchTerm(searchTerm: string): void {

    this.searchTermSubject.next(searchTerm);
  }
}
