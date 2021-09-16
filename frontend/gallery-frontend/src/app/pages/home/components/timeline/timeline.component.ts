import { Component, OnInit } from '@angular/core';
import { BookModel } from 'src/app/shared/models/book-model';
import { PersonModel } from 'src/app/shared/models/person.model';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  books: BookModel[] = [];
  spouseRequests: PersonModel[] = [];
  friendRequests: PersonModel[] = [];

  constructor() { }

  ngOnInit(): void {
    this.getLastBooks();
    this.getSpouseRequests();
    this.getFriendRequests();
  }

  getLastBooks(): void {
    for (let i: number = 0; i < 10; i++) {
      const book: BookModel = new BookModel();
      book.id = i;
      book.toCreate(
        `Titulo do book ${i + 1}`,
        'Descrição do book, Lorem ipsum dolor sit amet consectetur adipisicing elit. Non odio expedita dolore quis perspiciatis tempora, illum vitae magnam ad explicabo ut dolorum eveniet nemo minus inventore pariatur? Accusantium, hic dolores. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem molestiae obcaecati error dolores. Possimus voluptatem porro cumque minus laborum nisi obcaecati tempora. Nulla possimus deleniti similique ut dolores impedit doloribus.',
        'https://images.pexels.com/photos/3565370/pexels-photo-3565370.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        'Pedro Henrique',
      );
      for (let j: number = 0; j < i + 1; j++) {
        book.images.push('https://images.pexels.com/photos/3565370/pexels-photo-3565370.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940');
      }
      this.books.push(book);
    }
  }

  getSpouseRequests(): void {
    for (let i: number = 0; i < 3; i++) {
      let person: PersonModel = new PersonModel();
      if (i % 2 == 0) {
        person.spouse = 'Pessoa';
      }
      person.id = i + 1;
      person.name = `Fulano ${i + 1}`
      person.image = 'https://images.pexels.com/photos/3565370/pexels-photo-3565370.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
      this.spouseRequests.push(person);
    }
  }

  getFriendRequests(): void {
    for (let i: number = 0; i < 6; i++) {
      let person: PersonModel = new PersonModel();
      if (i % 2 == 0) {
        person.spouse = 'Pessoa';
      }
      person.id = i + 1;
      person.name = `Fulano ${i + 1}`
      person.image = 'https://images.pexels.com/photos/3565370/pexels-photo-3565370.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
      this.friendRequests.push(person);
    }
  }

}
