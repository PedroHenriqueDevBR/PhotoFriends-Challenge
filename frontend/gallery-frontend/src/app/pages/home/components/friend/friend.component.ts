import { Component, OnInit } from '@angular/core';
import { PersonModel } from 'src/app/shared/models/person.model';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {

  friends: PersonModel[] = [];

  constructor() { }

  ngOnInit(): void {
    this.getFriends();
  }

  getFriends(): void {
    for (let i = 0; i < 20; i++) {
      let person: PersonModel = new PersonModel();
      person.name = `Fulano ${i+1}`
      person.image = 'https://images.pexels.com/photos/3565370/pexels-photo-3565370.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
      this.friends.push(person);
    }
  }

}
