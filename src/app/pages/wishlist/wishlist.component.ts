import { Component, OnInit } from '@angular/core';
import { FormManage } from '../../core/helpers/formVaild';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { KeyValuePipe } from '@angular/common';
import { ImageLoaderComponent } from '../../shared/components/image-loader/image-loader.component';
import { RouterLink } from '@angular/router';
import { ExtractIdPipe } from '../../core/pipes/extract-id.pipe';
import { CutStringsPipe } from '../../core/pipes/cut-strings.pipe';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ImageLoaderComponent,
    KeyValuePipe,
    ExtractIdPipe,
    CutStringsPipe,
    RouterLink,
  ],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent extends FormManage implements OnInit {
  showForm = false;
  listForm: FormGroup;
  wishLists: { id: { name; description; books } };
  updateMood = false;
  target;
  constructor(private wishlistService: WishlistService) {
    super();
  }

  ngOnInit(): void {
    this.getwishLists();
  }

  initForm() {
    this.listForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
    this.setForm(this.listForm);
  }

  getwishLists() {
    this.wishLists = this.wishlistService.getLists();
  }

  onSubmit() {
    if (this.isFormValid) {
      // console.log(this.FormValue);
      // this.wishlistService
      //   .createList(this.FormValue)
      //   .pipe(take(1))
      //   .subscribe((res) => {
      //     this.clearForm();
      //   });

      this.updateMood
        ? this.wishlistService.updateList(this.FormValue)
        : this.wishlistService.createList(this.FormValue);
      this.clearForm();
      this.getwishLists();
    }
  }

  deleteItemHandler(listId) {
    this.wishlistService.deleteList(listId);
    this.getwishLists();
  }

  updateItemHandler(listId) {
    this.updateMood = true;
    const listDetails = this.wishlistService.getListDetails(listId);
    this.renderListForm();
    this.setDataToForm(listDetails);
  }

  renderListForm() {
    this.initForm();
    this.showForm = true;
  }

  removeBookHandler(listId, bookId) {
    this.wishlistService.removeBookfromList(listId, bookId);
    this.getwishLists();
  }

  clearForm() {
    this.showForm = false;
    this.updateMood = false;
    this.resetForm();
  }
}
