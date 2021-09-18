
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  currentPage: number = 0;

  constructor(private router: Router) { }

  @Input()
  isHide: boolean = true;

  @Output()
  hideMenu = new EventEmitter();

  ngOnInit(): void {}

  changePage(page: number) : void {
    this.isHide = !this.isHide;
    this.hideMenu.emit();
    this.currentPage = page;
    if (page == 0) {
      this.router.navigateByUrl('/home');
    } else if (page == 1) {
      this.router.navigateByUrl('/home/books');
    } else if (page == 2) {
      this.router.navigateByUrl('/home/amigos');
    }
  }

}
