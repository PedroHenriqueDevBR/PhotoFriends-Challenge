import { Component, OnInit } from '@angular/core';
import { BookModel } from 'src/app/shared/models/book-model';
import { PhotoModel } from 'src/app/shared/models/photo-model';
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
  aceptPhotos: PhotoModel[] = [];
  pendingPhotos: PhotoModel[] = [];

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
          book.cover_image = '/server' + book.cover_image;
          book.photos.forEach(photo => {
            photo.url = '/server' + photo.url;
          });
        });
        this.books = [];
        this.books.push(...data);
      }
    );
  }

  selectBook(book: BookModel) {
    this.selectedBook = book;
    this.pendingPhotos = [];
    this.pendingPhotos = [];
    this.pendingPhotos.push(...book.photos.filter(el => el.acepted == false));
    this.aceptPhotos = [];
    this.aceptPhotos.push(...book.photos.filter(el => el.acepted == true));
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
    this.selectedBook = new BookModel();
  }

}
