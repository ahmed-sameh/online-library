import { Injectable } from '@angular/core';
import { NetworkService } from '../network/network.service';
import { HttpClient } from '@angular/common/http';
import { map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  booksState = {};
  authorsBooksState = {};
  editionsState = {};

  constructor(
    private http: HttpClient,
    private networkService: NetworkService
  ) {}

  getBooksBySubject(subject) {
    if (subject in this.booksState) {
      return of(this.booksState[subject]);
    } else {
      return this.http
        .get(this.networkService.urlHandler(`subjects/${subject}.json`))
        .pipe(
          // add main subject to each book
          map((res: any) => {
            const typeBooks = res.works.map((el) => ({
              ...el,
              main_subject: subject,
            }));
            return typeBooks;
          }),

          // store books in state to prevent futures http requests
          tap((typeBooks) => {
            this.booksState[subject] = typeBooks;
          })
        );
    }
  }

  getBooksByAuthor(id) {
    if (id in this.authorsBooksState) {
      return of(this.authorsBooksState[id]);
    } else {
      return this.http
        .get(this.networkService.urlHandler(`authors/${id}/works.json`))
        .pipe(
          // store books in state to prevent futures http requests
          tap((typeBooks) => {
            this.authorsBooksState[id] = typeBooks;
          })
        );
    }
  }

  getBooksDetailsLocaly(subject, id) {
    if (subject in this.booksState) {
      const targetSubjectBooks = this.booksState[subject];
      const targetBook = targetSubjectBooks.find((el) => el.key.includes(id));
      return targetBook ? of(targetBook) : this.getBookDetailsFromServer(id);
    } else {
      return this.getBookDetailsFromServer(id);
    }
  }

  getBookDetailsFromServer(id) {
    return this.http.get(
      this.networkService.urlHandler(`works/${id}.json`, { details: true })
    );
  }

  getBooksEditionsDetailsLocaly(id) {
    if (id in this.editionsState) {
      const targetBookEditions = this.editionsState[id];
      return targetBookEditions
        ? of(targetBookEditions)
        : this.getBookEditionsDetailsFromServer(id);
    } else {
      return this.getBookEditionsDetailsFromServer(id);
    }
  }

  getBookEditionsDetailsFromServer(id) {
    return this.http
      .get(this.networkService.urlHandler(`works/${id}/editions.json`))
      .pipe(
        tap((editionDetails) => {
          this.editionsState[id] = editionDetails;
        })
      );
  }
}
