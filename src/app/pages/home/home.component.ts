import { Component, OnInit } from '@angular/core';
import { BookCardComponent } from '../../shared/components/book-card/book-card.component';
import { HomeService } from '../../core/services/home/home.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BookCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  books = [];
  constructor(private homeService: HomeService) {}
  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this.homeService
      .getHomeData()
      .pipe(take(1))
      .subscribe((res) => {
        this.books = res.works;
        console.log(this.books);
      });
  }
}
