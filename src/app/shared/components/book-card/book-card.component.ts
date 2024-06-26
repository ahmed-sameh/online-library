import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ImageLoaderComponent } from '../image-loader/image-loader.component';
import { CutStringsPipe } from '../../../core/pipes/cut-strings.pipe';
import { SlicePipe } from '@angular/common';
import { BookData } from '../../../core/interfaces/book.interface';
import { ExtractIdPipe } from '../../../core/pipes/extract-id.pipe';
import { WhishlistItemsComponent } from '../whishlist-items/whishlist-items.component';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [
    RouterLink,
    ImageLoaderComponent,
    CutStringsPipe,
    SlicePipe,
    ExtractIdPipe,
    WhishlistItemsComponent,
  ],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss',
})
export class BookCardComponent {
  @Input() _details!: BookData;
  showList = false;

  getAuthors(authors: string[]) {
    return authors.join(', ');
  }

  showWishLists() {
    this.showList = true;
  }

  closeWhishListsHandler() {
    this.showList = false;
  }
}
