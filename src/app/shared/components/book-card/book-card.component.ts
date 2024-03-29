import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ImageLoaderComponent } from '../image-loader/image-loader.component';
import { CutStringsPipe } from '../../../core/pipes/cut-strings.pipe';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [RouterLink, ImageLoaderComponent, CutStringsPipe, SlicePipe],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss',
})
export class BookCardComponent {
  @Input() _details!: {
    title;
    id;
    cover_id;
    authors: { key; name }[];
    first_publish_year;
  };

  getAuthors(authors: string[]) {
    console.log(authors);
    console.log(authors.join(', '));
    return authors.join(', ');
  }
}
