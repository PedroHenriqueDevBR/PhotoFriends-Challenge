import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BookModel } from 'src/app/shared/models/book-model';
import { PhotoModel } from 'src/app/shared/models/photo-model';
import { BookService } from 'src/app/shared/services/book.service';
import { PhotoService } from 'src/app/shared/services/photo.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  showAccordion: boolean = false;
  hideBookFormModal: boolean = true;
  hidePhotoFormModal: boolean = true;
  books: BookModel[] = [];
  selectedBook: BookModel = new BookModel();
  aceptPhotos: PhotoModel[] = [];
  pendingPhotos: PhotoModel[] = [];

  constructor(
    private photoService: PhotoService,
    private toast: ToastrService,
    private bookService: BookService,
  ) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.bookService.booksFromLoggedUser().subscribe(
      data => {
        // console.table(data);
        data.forEach(book => {
          book.cover_image = environment.API + book.cover_image;
          book.photos.forEach(photo => {
            photo.url = environment.API + photo.url;
          });
        });
        this.books = [];
        this.books.push(...data);
      }
    );
    console.table(this.pendingPhotos);
  }

  selectBook(book: BookModel) {
    this.selectedBook = book;
    this.pendingPhotos = [];
    this.pendingPhotos.push(...book.photos.filter(el => el.acepted == false));
    this.aceptPhotos = [];
    this.aceptPhotos.push(...book.photos.filter(el => el.acepted == true));
    this.showAccordion = false;
  }

  openBookFormModal(): void {
    this.hideBookFormModal = false;
  }

  closeBookFormModal(event: any): void {
    if (event == true) {
      this.getBooks();
    }
    this.hideBookFormModal = true;
  }

  openPhotoFormModal(): void {
    this.hidePhotoFormModal = false;
  }

  async resetBookData(updatedID: number) {
    this.selectedBook = new BookModel();
    this.getBooks();
  }

  closePhotoFormModal(event: any): void {
    if (event == true) {
      let updatedID = this.selectedBook.id!;
      // this.resetBookData(updatedID);
    }
    this.hidePhotoFormModal = true;
  }

  updatedImages(event: any) {
    if (event == true) {
      let updatedID = this.selectedBook.id!;
      this.resetBookData(updatedID);
    }
  }

  acceptImage(photo: PhotoModel | undefined) {
    if (photo != undefined) {
      if (photo!.acepted) {
        this.toast.warning('A imagem já está disponível para visualizalção');
        return;
      }
      this.photoService.acceptPhoto(this.selectedBook.id!, photo.id!).subscribe(
        data => {
          this.toast.success('Alteração realizada');
          let index = this.pendingPhotos.findIndex(el => el.id == photo.id);
          if (index >= 0) {
            photo.acepted = true;
            this.pendingPhotos.splice(index, 1);
            this.aceptPhotos.push(photo);
          }
        },
        error => {}
      );
    }
  }

  rejectImage(photo: PhotoModel | undefined) {
    if (photo != undefined) {
      if (!photo!.acepted) {
        this.toast.warning('A imagem já está oculta');
        return;
      }
      this.photoService.rejectPhoto(this.selectedBook.id!, photo.id!).subscribe(
        data => {
          this.toast.success('Alteração realizada');
          let index = this.aceptPhotos.findIndex(el => el.id == photo.id);
          if (index >= 0) {
            photo.acepted = false;
            this.aceptPhotos.splice(index, 1);
            this.pendingPhotos.push(photo);
          }
        },
        error => {}
      );
    }
  }

  deleteImage(photo: PhotoModel | undefined) {
    if (photo != undefined) {
      this.photoService.deletePhoto(photo.id!).subscribe(
        data => {
          this.toast.success('Imagem deletada');
          let acceptedIndex = this.aceptPhotos.findIndex(el => el.id == photo.id);
          let pedingIndex = this.pendingPhotos.findIndex(el => el.id == photo.id);
          if (acceptedIndex >= 0) {
            this.aceptPhotos.splice(acceptedIndex, 1);
          }
          if (pedingIndex >= 0) {
            this.aceptPhotos.splice(pedingIndex, 1);
          }
        },
        error => {}
      );
    }
  }

}
