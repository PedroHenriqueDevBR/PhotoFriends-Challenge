import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-friend-item',
  templateUrl: './friend-item.component.html',
  styleUrls: ['./friend-item.component.css']
})
export class FriendItemComponent implements OnInit {
  @Input()
  name: String = '';
  
  @Input()
  image: String = '';

  @Input()
  selected: boolean = false;

  @Input()
  showOptions: boolean = false;

  @Output()
  response = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  acceptEmit(): void {
    this.response.emit(true);
  }

  rejectEmit(): void {
    this.response.emit(false);
  }

}
