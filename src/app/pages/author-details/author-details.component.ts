import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthorsService } from '../../core/services/author/author.service';
import { Subscription, take } from 'rxjs';
import { ExtractIdPipe } from '../../core/pipes/extract-id.pipe';
import { ImageLoaderComponent } from '../../shared/components/image-loader/image-loader.component';
import { KeyValuePipe } from '@angular/common';
import { SearchService } from '../../core/services/search.service';
import { SearchOptions } from '../../core/models/search.model';

@Component({
  selector: 'app-author-details',
  standalone: true,
  imports: [ImageLoaderComponent, ExtractIdPipe, RouterLink, KeyValuePipe],
  templateUrl: './author-details.component.html',
  styleUrl: './author-details.component.scss',
})
export class AuthorDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private activatedRoute: ActivatedRoute,
    private authorsService: AuthorsService,
    private searchService: SearchService
  ) {}
  _ID;
  details;
  books;
  topBook;
  top5Subjects = [];
  paramsSub: Subscription;
  ngOnInit(): void {
    this.getParams();
  }

  getParams() {
    this.paramsSub = this.activatedRoute.paramMap.subscribe((params) => {
      this._ID = params.get('id');
      this.getAuthorDetails();
    });
  }

  getAuthorDetails() {
    this.authorsService
      .getAuthorDetailsLocaly(this._ID)
      .pipe(take(1))
      .subscribe((details) => {
        this.details = details;
        console.log(details);
        this.getAuthorBooks();
      });
  }

  getAuthorBooks() {
    const options: SearchOptions = {
      author: this.details.name,
      sort: 'new',
    };
    this.searchService
      .search(options)
      .pipe(take(1))
      .subscribe((books: any) => {
        console.log(books);
        this.books = books.docs;
        this.top5Subjects = this.getTop5Subjects(books.docs);
        console.log(this.top5Subjects);
        this.topBook = this.getMostReadBook(books.docs);
      });
  }

  getTop5Subjects(books) {
    // Count occurrences of each subject
    const subjectCounter: { [key: string]: number } = {};
    books.forEach((book) => {
      if (book.subject) {
        book.subject.forEach((subject) => {
          subjectCounter[subject] = (subjectCounter[subject] || 0) + 1;
        });
      }
    });

    // Get the top 5 most common subjects
    const topSubjects = Object.entries(subjectCounter)
      .sort(([, countA], [, countB]) => countB - countA)
      .slice(0, 5);

    return topSubjects.map(([subject, count]) => ({ subject, count }));
  }

  getMostReadBook(books) {
    return books.reduce((mostReadBook, currentBook) => {
      return currentBook.readinglog_count > mostReadBook.readinglog_count
        ? currentBook
        : mostReadBook;
    });
  }

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
  }
}
