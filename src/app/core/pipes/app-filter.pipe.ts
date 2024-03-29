import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listFilter',
})
export class ListFilterPipe implements PipeTransform {
  constructor() {}
  transform(items: any[], searchText: string, itemSearchKey: string): any[] {
    // return empty array if array is falsy
    if (!items) {
      return [];
    }
    // return the original array if search text is empty
    if (!searchText || !itemSearchKey) {
      return items;
    }
    // convert the searchText to lower case
    searchText = searchText.toLowerCase();

    // retrun the filtered array based on lang
    return items.filter((item) => {
      if (item && item[itemSearchKey]) {
        return item[itemSearchKey].toLowerCase().includes(searchText);
      }
      return false;
    });
  }
}
