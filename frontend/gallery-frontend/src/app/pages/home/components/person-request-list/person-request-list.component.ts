import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { InvitationModel } from 'src/app/shared/models/invitation-model';
import { PersonModel } from 'src/app/shared/models/person.model';
import { FriendService } from 'src/app/shared/services/friend.service';
import { SpouseService } from 'src/app/shared/services/spouse.service';

@Component({
  selector: 'app-person-request-list',
  templateUrl: './person-request-list.component.html',
  styleUrls: ['./person-request-list.component.css']
})
export class PersonRequestListComponent implements OnInit {
  spouseRequests: InvitationModel[] = [];
  friendRequests: InvitationModel[] = [];

  constructor(
    private friendService: FriendService,
    private spouseService: SpouseService,
    private toast: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getSpouseRequests();
    this.getFriendRequests();
  }

  getSpouseRequests(): void {
    this.spouseService.getMySpouseInvitations().subscribe(
      data => {
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
        this.toast.success('Pedido de amizade aceito');
      },
      error => {
       
      }
    )
  }

  rejectFriendInvitation(id: number): void {
    this.friendService.rejectInvitation(id).subscribe(
      data => {
        this.removeFriendInvitation(id);
        this.toast.success('Pedido de amizade recusado');
      },
      error => {
       
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
        this.toast.success('Pedido de cônjuge aceito');
      },
      error => {
        if (error.status == 406) {
          this.removeSpouseInvitation(id);
          for (var item of error.error.errors) {
            this.toast.error(item);
          }
        } else {
          this.toast.error('Erro ao aceitas solicitação');
        }
      }
    )
  }

  rejectSpouseInvitation(id: number): void {
    this.spouseService.rejectInvitation(id).subscribe(
      data => {
        this.removeSpouseInvitation(id);
        this.toast.success('Pedido de cônjuge recusado');
      },
      error => {
       
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
