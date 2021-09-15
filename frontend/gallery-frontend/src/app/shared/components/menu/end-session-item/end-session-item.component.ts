import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-end-session-item',
  templateUrl: './end-session-item.component.html',
  styleUrls: ['./end-session-item.component.css']
})
export class EndSessionItemComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {}

  endSession(): void {
    this.userService.logout();
    this.goToLoginPage();
  }

  goToLoginPage(): void {
    this.router.navigateByUrl('/login');
  }

}
