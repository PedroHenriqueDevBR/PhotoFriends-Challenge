import { Component, OnInit } from '@angular/core';
import { BookModel } from 'src/app/shared/models/book-model';
import { BookService } from 'src/app/shared/services/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  hideBookFormModal: boolean = true;
  hidePhotoFormModal: boolean = true;
  books: BookModel[] = [];
  selectedBook: BookModel = new BookModel();

  constructor(
    private bookService: BookService,
  ) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.bookService.booksFromLoggedUser().subscribe(
      data => {
        data.forEach(book => {
          book.cover_image = 'http://localhost:8000' + book.cover_image;
          book.photos.forEach(photo => {
            photo.url = 'http://localhost:8000' + photo.url;
          });
        });
        this.books = [];
        this.books.push(...data);
      }
    );
  }

  selectBook(book: BookModel) {
    console.log('Book selecionado');
    this.selectedBook = book;
  }

  openBookFormModal(): void {
    this.hideBookFormModal = false;
  }

  closeBookFormModal(): void {
    this.hideBookFormModal = true;
  }

  openPhotoFormModal(): void {
    this.hidePhotoFormModal = false;
  }

  closePhotoFormModal(): void {
    this.hidePhotoFormModal = true;
    this.getBooks();
  }

}
