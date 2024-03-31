import { Injectable } from '@angular/core';
import { NetworkService } from './network/network.service';
import { HttpClient } from '@angular/common/http';
import { SearchOptions } from '../models/search.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(
    private http: HttpClient,
    private networkService: NetworkService
  ) {}

  search(options: SearchOptions) {
    if (options.type == 'subject') {
      return this.http.get(
        this.networkService.urlHandler(
          `subjects/${options.subject_keyword}.json`
        )
      );
    } else {
      return this.http.get(
        this.networkService.urlHandler(`search.json`, options)
      );
    }
  }
}
