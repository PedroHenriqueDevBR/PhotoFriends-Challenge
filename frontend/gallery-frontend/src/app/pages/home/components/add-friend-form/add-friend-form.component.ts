import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FriendService } from 'src/app/shared/services/friend.service';


@Component({
  selector: 'app-add-friend-form',
  templateUrl: './add-friend-form.component.html',
  styleUrls: ['./add-friend-form.component.css']
})
export class AddFriendFormComponent implements OnInit {

  @Input()
  hide: boolean = true;

  @Output()
  emitClose = new EventEmitter<boolean>();

  successMsg: string = '';
  errorMsg: string = '';

  form: FormGroup;

  constructor(private friendService: FriendService) {
    this.form = this.createInviteForm();
  }

  ngOnInit(): void {
  }

  createInviteForm(): FormGroup {
    return new FormGroup({
      username: new FormControl(),
    });
  }

  createInvite(username: string): void {
    this.friendService.createFriendInvite(username).subscribe(
      data => {
        this.successMsg = 'Pedido de amizade enviado com sucesso';
        this.errorMsg = '';
      },
      error => {
        ;
        if (error.status == 406) {
          this.errorMsg = `${error.error.errors}`;
        } else {
          this.successMsg = '';
          this.errorMsg = `${error.status} - Erro ao executar ação!`;
        }
      }
    );
  }

  onSubmit(): void {
    const username: string = this.form.value['username'];
    if (username.length < 5) {
      this.errorMsg = 'O username deve conter pelo menos 5 caracteres';
    } else {
      this.errorMsg = '';
      this.createInvite(username);
    }
  }

  closeModal(): void {
    this.hide = true;
    this.emitClose.emit();
  }

}
