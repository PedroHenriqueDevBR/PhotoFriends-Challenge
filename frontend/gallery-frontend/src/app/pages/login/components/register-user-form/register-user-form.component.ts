import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonModel } from 'src/app/shared/models/person.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-register-user-form',
  templateUrl: './register-user-form.component.html',
  styleUrls: ['./register-user-form.component.css']
})
export class RegisterUserFormComponent implements OnInit {

  successMsg: String = '';
  errorMsg: String[] = [];
  formRegister: FormGroup;
  person: PersonModel;

  constructor(private userService: UserService) {
    this.person = new PersonModel();
    this.formRegister = this.createForm(this.person);
  }

  ngOnInit(): void {}

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
        this.successMsg = 'Usuário registrado com sucesso\nVolte e efetue o login';
        this.errorMsg = [];
      },
      (error) => {
        if (error.status == 409) {
          this.errorMsg.push('Username já registrado');
          this.successMsg = '';
        } else if (error.status == 406) {
          this.successMsg = '';
          this.errorMsg = [];
          for (var item of error.error.errors) {
            this.errorMsg.push(item);
          }
        } else {
          this.successMsg = '';
          this.errorMsg.push('Erro ao registrar usuário');
        }
      }
    );
  }

}
