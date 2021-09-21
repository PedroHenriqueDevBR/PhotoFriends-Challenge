import { Component, OnInit } from '@angular/core';
import { BookModel } from 'src/app/shared/models/book-model';
import { BookService } from 'src/app/shared/services/book.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  books: BookModel[] = [];
  selectedBook: BookModel = new BookModel();
  hidePhotoFormModal: boolean = true;

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
          el.cover_image = environment.API + el.cover_image;
          for (let photo of el.photos) {
            photo.url = environment.API + photo.url;
          }
        });
        this.books.push(...data);
      },
      error => {}
    );
  }

  selectBook(book: BookModel): void {
    console.log('selectBook');
    if (this.selectedBook.id == book.id) {
      console.log('selectBook pt-2');
      this.selectedBook = new BookModel();
      return;
    }
    this.selectedBook = book;
  }

  openPhotoFormModal(): void {
    this.hidePhotoFormModal = false;
  }

  closePhotoFormModal(): void {
    this.hidePhotoFormModal = true;
    this.selectedBook = new BookModel();
  }

}
