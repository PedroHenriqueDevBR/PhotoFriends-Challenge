import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { MenuItemComponent } from './shared/components/menu/menu-item/menu-item.component';
import { BookComponent } from './pages/home/components/book/book.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { LoginFormComponent } from './pages/login/components/login-form/login-form.component';
import { RegisterUserFormComponent } from './pages/login/components/register-user-form/register-user-form.component';
import { TimelineComponent } from './pages/home/components/timeline/timeline.component';
import { FriendComponent } from './pages/home/components/friend/friend.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EndSessionItemComponent } from './shared/components/menu/end-session-item/end-session-item.component';
import { FriendItemComponent } from './shared/components/friend-item/friend-item.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LoginFormComponent,
    RegisterUserFormComponent,
    HeaderComponent,
    MenuComponent,
    MenuItemComponent,
    TimelineComponent,
    BookComponent,
    FriendComponent,
    EndSessionItemComponent,
    FriendItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
