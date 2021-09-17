import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


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

  constructor() { }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.hide = true;
    this.emitClose.emit();
  }

}
