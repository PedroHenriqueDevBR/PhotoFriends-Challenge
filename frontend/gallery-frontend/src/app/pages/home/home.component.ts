import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  hideMenu: boolean = true;

  ngOnInit(): void {
    if (!this.userService.userIsLogged()) {
      this.goToLoginPage();
    }
  }

  goToLoginPage(): void {
    this.router.navigateByUrl('/login');
  }

  changeMenuStatus(): void {
    this.hideMenu = !this.hideMenu;
  }

}
