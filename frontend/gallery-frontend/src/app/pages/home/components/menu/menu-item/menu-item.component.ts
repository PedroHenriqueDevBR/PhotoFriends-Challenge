import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {
  @Input()
  text: string = '';

  @Input()
  selected: boolean = false;

  @Input()
  isHide: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
