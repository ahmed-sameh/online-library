import { Component, OnInit } from '@angular/core';
import { BookCardComponent } from '../../shared/components/book-card/book-card.component';
import { BooksService } from '../../core/services/books/books.service';
import { take } from 'rxjs';
import { SlicePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ExtractIdPipe } from '../../core/pipes/extract-id.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [BookCardComponent, SlicePipe, RouterLink, ExtractIdPipe],
})
export class HomeComponent implements OnInit {
  books = [];
  constructor(private BooksService: BooksService) {}
  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this.BooksService.getBooksBySubject('finance')
      .pipe(take(1))
      .subscribe((booksList) => {
        this.books = booksList;
      });
  }
}
