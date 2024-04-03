import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { BooksService } from '../../core/services/books/books.service';
import { ImageLoaderComponent } from '../../shared/components/image-loader/image-loader.component';
import { ExtractIdPipe } from '../../core/pipes/extract-id.pipe';
import { AuthorsService } from '../../core/services/author/author.service';
import { WhishlistItemsComponent } from '../../shared/components/whishlist-items/whishlist-items.component';
const extractIdPipe = new ExtractIdPipe();
@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [
    ImageLoaderComponent,
    ExtractIdPipe,
    RouterLink,

    WhishlistItemsComponent,
  ],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss',
})
export class BookDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private activatedRoute: ActivatedRoute,
    private authorsService: AuthorsService,
    private booksService: BooksService
  ) {}
  _ID;
  _subject;
  details;
  editionDetails;
  authors = [];
  paramsSub: Subscription;
  showList = false;

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
        console.log(details);
        this.authorListHandler(details);
      });
  }

  getBookEditionsDetails() {
    this.booksService
      .getBooksEditionsDetailsLocaly(this._ID)
      .pipe(take(1))
      .subscribe((details) => {
        this.getEditionsDetails(details);
      });
  }

  getEditionsDetails(data) {
    const editions = data.entries as any[];
    // Sorting editions array by publish_date
    editions.sort((a, b) => {
      return parseInt(a.publish_date) - parseInt(b.publish_date);
    });

    this.editionDetails = {
      first: editions[0],
      latest: editions[editions.length - 1],
      counts: editions.length,
    };
  }

  authorListHandler(bookDetails) {
    if (bookDetails.authors.length > 0 && 'name' in bookDetails.authors[0]) {
      this.authors = bookDetails.authors;
    } else {
      const ids = bookDetails.authors
        .map((el) => extractIdPipe.transform(el.author.key))
        .slice(0, 5);
      this.getAuthors(ids);
    }
  }

  getAuthors(idsList) {
    this.authorsService
      .getGroupOfAuthors(idsList)
      .pipe(take(1))
      .subscribe((res) => {
        this.authors = res.map((el: any) => ({ name: el.name, key: el.key }));
        console.log(this.authors);
      });
  }

  showWishLists() {
    this.showList = true;
  }

  closeWhishListsHandler() {
    this.showList = false;
  }

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
  }
}
