import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookData } from '../../../core/interfaces/book.interface';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { KeyValuePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-whishlist-items',
  standalone: true,
  imports: [KeyValuePipe, RouterLink],
  templateUrl: './whishlist-items.component.html',
  styleUrl: './whishlist-items.component.scss',
})
export class WhishlistItemsComponent implements OnInit {
  @Input() bookDetails!: BookData;
  @Output() closeList = new EventEmitter<boolean>();
  lists = [];

  constructor(private wishlistsService: WishlistService) {}

  ngOnInit(): void {
    this.getListItems();
  }

  getListItems() {
    this.lists = this.wishlistsService.getLists();
  }

  bookListActions(listId) {
    this.isBookExistInList(listId)
      ? this.wishlistsService.removeBookfromList(listId, this.bookDetails.key)
      : this.wishlistsService.addBooktoList(listId, this.bookDetails);
    this.getListItems();
  }

  isBookExistInList(listID) {
    const listDetails = this.wishlistsService.getListDetails(listID);
    const targetBook = listDetails.books.find(
      (book) => book.key == this.bookDetails.key
    );
    return targetBook ? true : false;
  }
  closeMenu() {
    this.closeList.emit(false);
  }
}
