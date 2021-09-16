import { Component, OnInit } from '@angular/core';
import { BookModel } from 'src/app/shared/models/book-model';
import { PersonModel } from 'src/app/shared/models/person.model';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {
  friends: PersonModel[] = [];
  selectedFriend: PersonModel = new PersonModel();
  selectedBook: BookModel = new BookModel();

  constructor() { }

  ngOnInit(): void {
    this.getFriends();
  }

  getFriends(): void {
    for (let i: number = 0; i < 20; i++) {
      let person: PersonModel = new PersonModel();
      if (i % 2 == 0) {
        person.spouse = 'Pessoa';
      }
      person.id = i + 1;
      person.name = `Fulano ${i + 1}`
      person.image = 'https://images.pexels.com/photos/3565370/pexels-photo-3565370.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
      this.friends.push(person);
    }
  }

  selectFriend(person: PersonModel): void {
    this.selectedFriend = person;
    this.getBooks(person);
    this.selectedBook = new BookModel();
  }

  getBooks(friend: PersonModel): void {
    if (friend.books.length == 0) {
      let books = [];
      for (let i: number = 0; i < friend.id!; i++) {
        const book: BookModel = new BookModel();
        book.id = i;
        book.toCreate(
          `Titulo do book ${i + 1}`,
          'Descrição do book, Lorem ipsum dolor sit amet consectetur adipisicing elit. Non odio expedita dolore quis perspiciatis tempora, illum vitae magnam ad explicabo ut dolorum eveniet nemo minus inventore pariatur? Accusantium, hic dolores. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem molestiae obcaecati error dolores. Possimus voluptatem porro cumque minus laborum nisi obcaecati tempora. Nulla possimus deleniti similique ut dolores impedit doloribus.',
          'https://images.pexels.com/photos/3565370/pexels-photo-3565370.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          'Pedro Henrique',
        );
        for (let j:number = 0; j < i + 1; j++) {
          book.images.push('https://images.pexels.com/photos/3565370/pexels-photo-3565370.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940');
        }
        books.push(book);
      }
      friend.books = books;
    }
  }

  selectBook(book: BookModel): void {
    console.log('Galeria selecionada');
    console.log(book.id);
    if (this.selectedBook.id == book.id) {
      this.selectedBook = new BookModel();
      return;
    }
    this.selectedBook = book;

  }

}
