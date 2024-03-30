import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { BooksService } from '../../core/services/books/books.service';
import { ImageLoaderComponent } from '../../shared/components/image-loader/image-loader.component';
import { ExtractIdPipe } from '../../core/pipes/extract-id.pipe';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [ImageLoaderComponent, ExtractIdPipe, RouterLink],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss',
})
export class BookDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private activatedRoute: ActivatedRoute,
    private booksService: BooksService
  ) {}
  _ID;
  _subject;
  details;
  pagesCount;

  paramsSub: Subscription;
  ngOnInit(): void {
    this.getParams();
  }

  getParams() {
    this.paramsSub = this.activatedRoute.paramMap.subscribe((params) => {
      this._ID = params.get('id');
      this._subject = params.get('subject');
      this.getGeneralBookDetails();
      this.getBookEditionsDetails();
    });
  }

  getGeneralBookDetails() {
    this.booksService
      .getBooksDetailsLocaly(this._subject, this._ID)
      .pipe(take(1))
      .subscribe((details) => {
        this.details = details;
      });
  }

  getBookEditionsDetails() {
    this.booksService
      .getBooksEditionsDetailsLocaly(this._ID)
      .pipe(take(1))
      .subscribe((details) => {
        this.getPagesCount(details);
      });
  }

  getPagesCount(data) {
    const editions = data.entries as any[];
    // find the newest edition object
    const latestPublishedEdition = editions.reduce((prev, current) => {
      const prevYear = parseInt(prev.publish_date);
      const currentYear = parseInt(current.publish_date);
      return prevYear > currentYear ? prev : current;
    }, editions[0]);

    // check if page count avalible in the object and set full back if it not exist
    if ('number_of_pages' in latestPublishedEdition) {
      this.pagesCount = latestPublishedEdition.number_of_pages;
    } else {
      const fullBackEdition = editions.find((el) => 'number_of_pages' in el);
      this.pagesCount = fullBackEdition ? fullBackEdition.number_of_pages : 0;
    }
  }

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
  }
}
