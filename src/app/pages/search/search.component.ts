import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormManage } from '../../core/helpers/formVaild';
import { SlicePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ExtractIdPipe } from '../../core/pipes/extract-id.pipe';
import { BookCardComponent } from '../../shared/components/book-card/book-card.component';
import { SearchService } from '../../core/services/search.service';
import { SearchOptions } from '../../core/models/search.model';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BookCardComponent,
    SlicePipe,
    RouterLink,
    ExtractIdPipe,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent extends FormManage implements OnInit, OnDestroy {
  books = [];
  searchForm: FormGroup;
  submited = false;
  qparamsSub: Subscription;
  _options: SearchOptions;

  constructor(
    private searchService: SearchService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
    this.queryParamsHandler();
  }

  initForm() {
    this.searchForm = new FormGroup({
      keyword: new FormControl('', [Validators.required]),
      type: new FormControl('book', [Validators.required]),
    });
    this.setForm(this.searchForm);
  }

  queryParamsHandler() {
    this.qparamsSub = this.route.queryParamMap.subscribe((qparams) => {
      if (qparams.keys.length > 0) {
        const filters: SearchOptions = {};
        qparams.keys.forEach((key) => {
          filters[key] = qparams.get(key);
        });
        this._options = filters;
        this.setFormInputs();
        this.getBooks();
      }
    });
  }

  getBooks() {
    this.searchService
      .search(this._options)
      .pipe(take(1))
      .subscribe((res: any) => {
        console.log(res);
        if (this._options.type == 'subject') {
          this.books = res.works;
        } else {
          this.books = res.docs.map((el) => ({
            ...el,
            authors: this.formatAuthors(el.author_name, el.author_key),
          }));
        }
      });
  }

  search() {
    if (this.isFormValid) {
      this.submited = true;
      const searchOptions: SearchOptions = {
        type: this.FormValue.type,
      };
      switch (this.FormValue.type) {
        case 'book':
          searchOptions['title'] = this.FormValue.keyword;
          break;
        case 'subject':
          searchOptions['subject_keyword'] = this.FormValue.keyword;

          break;
        case 'author':
          searchOptions['author'] = this.FormValue.keyword;
          break;
      }
      this.router.navigate([], { queryParams: searchOptions });
    }
  }
  setFormInputs() {
    const data = {
      type: this._options.type,
    };
    switch (this._options.type) {
      case 'book':
        data['keyword'] = this._options.title;
        break;
      case 'subject':
        data['keyword'] = this._options.subject_keyword;

        break;
      case 'author':
        data['keyword'] = this._options.author;
        break;
    }

    this.setDataToForm(data);
  }

  formatAuthors(names: string[], keys: string[]) {
    const mergedArray = [];

    if (names && keys) {
      for (let i = 0; i < names.length && i < keys.length; i++) {
        mergedArray.push({
          name: names[i],
          key: keys[i],
        });
      }
    }

    return mergedArray;
  }
  clear(): void {
    this._options = {};
    this.setContollerValue('keyword', '');
    this.router.navigate([]);
    this.books = [];
  }
  ngOnDestroy(): void {
    this.qparamsSub.unsubscribe();
  }
}
