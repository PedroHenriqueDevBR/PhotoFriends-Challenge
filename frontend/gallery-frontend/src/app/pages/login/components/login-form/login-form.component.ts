import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginResponseModel } from 'src/app/shared/models/login_response.model';
import { PersonModel } from 'src/app/shared/models/person.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  formLogin: FormGroup;
  person: PersonModel;

  constructor(
    private userService: UserService,
    private router: Router,
    private toast: ToastrService,
  ) {
    this.person = new PersonModel();
    this.formLogin = this.createForm(this.person);
  }

  ngOnInit(): void { }

  createForm(person: PersonModel): FormGroup {
    return new FormGroup({
      username: new FormControl(person.username, [Validators.required, Validators.minLength(5)]),
      password: new FormControl(person.password, [Validators.required, Validators.minLength(8)]),
    });
  }

  loginPerson(): void {
    this.person.setLogin(this.formLogin.value['username'], this.formLogin.value['password']);
    this.userService.loginUser(this.person).subscribe(
      (data: LoginResponseModel) => {
        this.userService.saveJWT(data['access']);
        this.goToHomePage();
      },
      (error) => {
        if (error['status'] == 401) {
          this.toast.error('Usuário ou senha incorreta');
        } else {
          console.log(error);
        }
      }
    );
  }

  goToHomePage(): void {
    this.router.navigateByUrl('/home');
  }

  onSubmit() {
    if (this.formLogin.valid) {
      this.loginPerson();
    }
  }

}
