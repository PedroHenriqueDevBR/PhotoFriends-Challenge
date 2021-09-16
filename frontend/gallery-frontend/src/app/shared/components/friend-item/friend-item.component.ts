import { Component, Input, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
