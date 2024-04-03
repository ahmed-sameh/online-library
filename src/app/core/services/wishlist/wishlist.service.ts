import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { NetworkService } from '../network/network.service';
import { CachingService } from '../caching/caching.service';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  _listStorageName = 'ng-wichlist-storage';
  constructor(
    // private http: HttpClient,
    // private networkService: NetworkService,
    private cachingService: CachingService
  ) {
    if (!cachingService.isKeyExist(this._listStorageName)) {
      cachingService.set(this._listStorageName, {});
    }
  }

  getLists(): any {
    return this.cachingService.get(this._listStorageName);
  }

  getListDetails(listID) {
    const list = this.cachingService.get(this._listStorageName) as Object; //get lists from storage
    return list[listID];
  }

  createList(listData) {
    // return this.http.post(
    //   this.networkService.urlHandler(`people/test/lists`),
    //   listData,
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Accept: 'application/json',
    //       'Access-Control-Allow-Origin': '*',
    //     },
    //   }
    // );

    const listId = new Date().getTime();

    const list = this.cachingService.get(this._listStorageName) as Object; //get lists from storage
    const updatedList = { ...list };
    updatedList[listId] = {
      ...listData,
      id: listId,
      books: [],
    }; //update list
    this.cachingService.set(this._listStorageName, updatedList); // store it again
  }

  updateList(listData) {
    const listId = listData.id;
    const list = this.cachingService.get(this._listStorageName) as Object; //get lists from storage
    const updatedList = { ...list };
    updatedList[listId] = { ...updatedList[listId], ...listData }; //update list
    this.cachingService.set(this._listStorageName, updatedList); // store it again
  }

  deleteList(listId) {
    const list = this.cachingService.get(this._listStorageName) as Object; //get lists from storage
    const updatedList = { ...list };
    delete updatedList[listId];
    this.cachingService.set(this._listStorageName, updatedList); // store it again
  }

  addBooktoList(listId, bookDetails) {
    const list = this.cachingService.get(this._listStorageName) as Object; //get lists from storage
    const updatedList = { ...list };
    updatedList[listId].books.push(bookDetails); //update list
    this.cachingService.set(this._listStorageName, updatedList); // store it again
  }

  removeBookfromList(listId, bookId) {
    const list = this.cachingService.get(this._listStorageName) as Object; //get lists from storage
    const updatedList = { ...list };
    const bookIndex = updatedList[listId].books.findIndex(
      (el) => el.key == bookId
    ); //get book index to remove

    updatedList[listId].books.splice(bookIndex, 1); //remove el from array
    this.cachingService.set(this._listStorageName, updatedList); // store it again
  }
}
