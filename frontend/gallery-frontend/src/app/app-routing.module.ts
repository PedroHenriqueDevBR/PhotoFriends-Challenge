import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginFormComponent } from './components/login/components/login-form/login-form.component';
import { RegisterUserFormComponent } from './components/login/components/register-user-form/register-user-form.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent, children: [
      { path: '', component: LoginFormComponent, },
      { path: 'registrar', component: RegisterUserFormComponent, },
    ],
  },
  { path: 'home', component: HomeComponent, },
  { path: '**', redirectTo: 'login', },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
