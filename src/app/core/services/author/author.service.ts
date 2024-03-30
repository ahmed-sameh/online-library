import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NetworkService } from '../network/network.service';
import { forkJoin, of, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorsService {
  authorsState = {};

  constructor(
    private http: HttpClient,
    private networkService: NetworkService
  ) {}

  getAuthorDetailsLocaly(id) {
    if (id in this.authorsState) {
      const targetAuthor = this.authorsState[id];
      return targetAuthor
        ? of(targetAuthor)
        : this.getAuthorDetailsFromServer(id);
    } else {
      return this.getAuthorDetailsFromServer(id);
    }
  }

  getAuthorDetailsFromServer(id) {
    return this.http
      .get(this.networkService.urlHandler(`authors/${id}.json`))
      .pipe(
        tap((editionDetails) => {
          this.authorsState[id] = editionDetails;
        })
      );
  }

  getGroupOfAuthors(ids: string[]) {
    const requestsArray = ids.map((id) =>
      this.http
        .get(this.networkService.urlHandler(`authors/${id}.json`))
        .pipe(take(1))
    );
    return forkJoin(requestsArray);
  }
}
