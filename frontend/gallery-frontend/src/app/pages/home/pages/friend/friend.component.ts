import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BookModel } from 'src/app/shared/models/book-model';
import { PersonModel } from 'src/app/shared/models/person.model';
import { BookService } from 'src/app/shared/services/book.service';
import { FriendService } from 'src/app/shared/services/friend.service';
import { SpouseService } from 'src/app/shared/services/spouse.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {

  showAccordion: boolean = false;
  friends: PersonModel[] = [];
  selectedFriend: PersonModel = new PersonModel();
  selectedBook: BookModel = new BookModel();
  hideFriendFormModal: boolean = true;
  hidePhotoFormModal: boolean = true;

  constructor(
    private friendService: FriendService,
    private spouseService: SpouseService,
    private toast: ToastrService,
    private bookService: BookService,
  ) { }

  ngOnInit(): void {
    this.getFriends();
  }

  getFriends(): void {
    this.friendService.getMyFriends().subscribe(
      data => {
        this,this.friends = [];
        for (var item of data as Array<any>) {
          let person = new PersonModel();
          person.id = item.id;
          person.name = item.name;
          person.username = item.user.username;
          person.image = item.user.image;
          person.spouse = item.spouse;
          this.friends.push(person);
        }
      },
      error => {
       
      }
    );
  }

  selectFriend(person: PersonModel): void {
    this.selectedFriend = person;
    this.getBooks(person);
    this.selectedBook = new BookModel();
    this.showAccordion = false;
  }

  getBooks(friend: PersonModel): void {
    this.bookService.booksFromFriendByID(friend.id!).subscribe(
      data => {
        data.forEach(book => {
          book.cover_image = environment.API + book.cover_image;
          book.photos.forEach(photo => {
            photo.url = environment.API + photo.url;
          });
        });
        friend.books = [];
        friend.books.push(...data);
      }
    );
  }

  selectBook(book: BookModel): void {
    if (this.selectedBook.id === book.id) {
      this.selectedBook = new BookModel();
      return;
    }
    this.selectedBook = book;
  }

  requestSpouse(id: number): void {
    this.spouseService.createSpouseInvite(id).subscribe(
      data => {
        this.toast.success('Pedido enviado');
      },
      error => {
        ;
        if (error.status == 406) {
          for (var item of error.error.errors) {
            this.toast.error(item);
          }
        } else {
          this.toast.error('Erro ao solicitar cônjuge');
        }
      }
    );
  }

  openFriendFormModal(): void {
    this.hideFriendFormModal = false;
  }

  closeFriendFormModal(): void {
    this.hideFriendFormModal = true;
  }

  openPhotoFormModal(): void {
    this.hidePhotoFormModal = false;
  }

  closePhotoFormModal(): void {
    this.hidePhotoFormModal = true;
    this.getFriends();
    this.getBooks(this.selectedFriend);
  }

}
