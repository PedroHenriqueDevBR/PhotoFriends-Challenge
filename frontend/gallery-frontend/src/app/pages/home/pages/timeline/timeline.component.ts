import { Component, OnInit } from '@angular/core';
import { BookModel } from 'src/app/shared/models/book-model';
import { BookService } from 'src/app/shared/services/book.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  books: BookModel[] = [];

  constructor(
    private bookService: BookService,
  ) { }

  ngOnInit(): void {
    this.getLastBooks();
  }

  getLastBooks(): void {
    this.bookService.allBooksFromMyFriends().subscribe(
      data => {
        data.forEach(el => {
          el.cover_image = 'http://localhost:8000' + el.cover_image;
        });
        this.books.push(...data);
      },
      error => {}
    );
  }

}
