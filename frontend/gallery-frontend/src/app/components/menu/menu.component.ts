import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  currentPage: number = 0;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  changePage(page: number) : void {
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
