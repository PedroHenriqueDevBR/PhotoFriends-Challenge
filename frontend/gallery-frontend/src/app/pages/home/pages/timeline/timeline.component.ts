import { Component, OnInit } from '@angular/core';
import { BookModel } from 'src/app/shared/models/book-model';
import { InvitationModel } from 'src/app/shared/models/invitation-model';
import { PersonModel } from 'src/app/shared/models/person.model';
import { FriendService } from 'src/app/shared/services/friend.service';
import { SpouseService } from 'src/app/shared/services/spouse.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  books: BookModel[] = [];
  spouseRequests: InvitationModel[] = [];
  friendRequests: InvitationModel[] = [];

  constructor(
    private friendService: FriendService,
    private spouseService: SpouseService,
  ) { }

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
    this.spouseService.getMySpouseInvitations().subscribe(
      data => {
        console.log(data);
        for (var item of data as Array<any>) {
          const requester = item.requester;
          let person = new PersonModel();
          person.id = requester.id;
          person.name = requester.name;
          person.username = requester.user.username;
          person.image = requester.user.image;
          const invitation: InvitationModel = new InvitationModel(item.id, person);
          this.spouseRequests.push(invitation);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getFriendRequests(): void {
    this.friendService.getMyFriendInvitations().subscribe(
      data => {
        for (var item of data as Array<any>) {
          const requester = item.requester;
          let person = new PersonModel();
          person.id = requester.id;
          person.name = requester.name;
          person.username = requester.user.username;
          person.image = requester.user.image;
          const invitation: InvitationModel = new InvitationModel(item.id, person);
          this.friendRequests.push(invitation);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  responseFriendInvitation(id: number, accept: boolean): void {
    if (accept == true) {
      this.acceptFriendInvitation(id);
    } else {
      this.rejectFriendInvitation(id);
    }
  }

  acceptFriendInvitation(id: number): void {
    this.friendService.acceptInvitation(id).subscribe(
      data => {
        this.removeFriendInvitation(id);
      },
      error => {
        console.log(error);
      }
    )
  }

  rejectFriendInvitation(id: number): void {
    this.friendService.rejectInvitation(id).subscribe(
      data => {
        this.removeFriendInvitation(id);
      },
      error => {
        console.log(error);
      }
    )
  }

  removeFriendInvitation(id: number): void {
    const index = this.friendRequests.findIndex(el => el.id == id);
    if (index > -1) {
      this.friendRequests.splice(index, 1);
    }
  }

  responseSpouseInvitation(id: number, accept: boolean): void {
    if (accept == true) {
      this.acceptSpouseInvitation(id);
    } else {
      this.rejectSpouseInvitation(id);
    }
  }

  acceptSpouseInvitation(id: number): void {
    this.spouseService.acceptInvitation(id).subscribe(
      data => {
        this.removeSpouseInvitation(id);
      },
      error => {
        console.log(error);
      }
    )
  }

  rejectSpouseInvitation(id: number): void {
    this.spouseService.rejectInvitation(id).subscribe(
      data => {
        this.removeSpouseInvitation(id);
      },
      error => {
        console.log(error);
      }
    )
  }

  removeSpouseInvitation(id: number): void {
    const index = this.spouseRequests.findIndex(el => el.id == id);
    if (index > -1) {
      this.spouseRequests.splice(index, 1);
    }
  }

}
