import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  currentPage: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  changePage(page: number) : void {
    this.currentPage = page;
  }

}
