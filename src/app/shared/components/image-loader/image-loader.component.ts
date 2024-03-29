import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@Component({
  selector: 'app-image-loader',
  templateUrl: './image-loader.component.html',
  styleUrls: ['./image-loader.component.scss'],
  standalone: true,
  imports: [CommonModule, LazyLoadImageModule],
  encapsulation: ViewEncapsulation.None,
})
export class ImageLoaderComponent {
  @Input() imageLoading: boolean = false;
  @Input() imageLoaded: boolean = false;
  @Input() imageUrl: any = '';
  @Input() imageLoadingUrl: string = '';
  @Input() noImageUrl: string = '';
  @Input() alt: string = '';
  @Input() imageId: string = '';
  @Input() imageHeight: string = '';
  @Input() imageWidth: string = '';
  @Input() imageClass: string = '';
  errorOccured = false;
  onImageLoaded() {
    this.imageLoading = false;
  }
  handleEmptyImage() {
    this.imageLoading = false;
    this.imageUrl = this.noImageUrl;
    this.errorOccured = true;
  }

  getImageURL() {
    return this.imageUrl
      ? `https://covers.openlibrary.org/b/id/${this.imageUrl}.jpg`
      : this.noImageUrl;
  }
}
