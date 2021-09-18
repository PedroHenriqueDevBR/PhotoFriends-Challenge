import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PersonModel } from 'src/app/shared/models/person.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-register-user-form',
  templateUrl: './register-user-form.component.html',
  styleUrls: ['./register-user-form.component.css']
})
export class RegisterUserFormComponent implements OnInit {
  formRegister: FormGroup;
  person: PersonModel;

  constructor(
    private userService: UserService,
    private toast: ToastrService,
    private router: Router,
  ) {
    this.person = new PersonModel();
    this.formRegister = this.createForm(this.person);
  }

  ngOnInit(): void { }

  createForm(person: PersonModel): FormGroup {
    return new FormGroup({
      name: new FormControl(person.name, [Validators.required, Validators.minLength(3)]),
      username: new FormControl(person.username, [Validators.required, Validators.minLength(5)]),
      password: new FormControl(person.password, [Validators.required, Validators.minLength(8)]),
    });
  }

  registerPerson(): void {
    this.person.name = this.formRegister.value['name'];
    this.person.username = this.formRegister.value['username'];
    this.person.password = this.formRegister.value['password'];
    this.userService.registerUser(this.person).subscribe(
      (data) => {
        this.toast.success('Usuário registrado com sucesso\nefetue o login');
        this.router.navigateByUrl('/login');
      },
      (error) => {
        if (error.status == 409) {
          this.toast.error('Username já registrado');
        } else if (error.status == 406) {
          for (var item of error.error.errors) {
            this.toast.error(item);
          }
        } else {
          this.toast.error('Erro ao registrar usuário');
        }
      }
    );
  }

}
