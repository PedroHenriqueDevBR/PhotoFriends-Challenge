import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BookComponent } from './pages/home/pages/book/book.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginFormComponent } from './pages/login/components/login-form/login-form.component';
import { RegisterUserFormComponent } from './pages/login/components/register-user-form/register-user-form.component';
import { TimelineComponent } from './pages/home/pages/timeline/timeline.component';
import { FriendComponent } from './pages/home/pages/friend/friend.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent, children: [
      { path: '', component: LoginFormComponent, },
      { path: 'registrar', component: RegisterUserFormComponent, },
    ],
  },
  {
    path: 'home', component: HomeComponent, children: [
      { path: '', component: TimelineComponent, },
      { path: 'books', component: BookComponent, },
      { path: 'amigos', component: FriendComponent, },
    ],
  },
  { path: '**', redirectTo: 'login', },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
