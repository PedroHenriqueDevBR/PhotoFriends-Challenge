import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BookComponent } from './pages/home/pages/book/book.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { LoginFormComponent } from './pages/login/components/login-form/login-form.component';
import { RegisterUserFormComponent } from './pages/login/components/register-user-form/register-user-form.component';
import { TimelineComponent } from './pages/home/pages/timeline/timeline.component';
import { FriendComponent } from './pages/home/pages/friend/friend.component';
import { FriendItemComponent } from './pages/home/components/friend-item/friend-item.component';
import { BookItemComponent } from './pages/home/components/book-item/book-item.component';
import { AddFriendFormComponent } from './pages/home/components/add-friend-form/add-friend-form.component';
import { HeaderComponent } from './pages/home/components/header/header.component';
import { MenuComponent } from './pages/home/components/menu/menu.component';
import { MenuItemComponent } from './pages/home/components/menu/menu-item/menu-item.component';
import { EndSessionItemComponent } from './pages/home/components/menu/end-session-item/end-session-item.component';
import { GalleryComponent } from './pages/home/components/gallery/gallery.component';
import { PersonRequestListComponent } from './pages/home/components/person-request-list/person-request-list.component';
import { AddBookFormComponent } from './pages/home/components/add-book-form/add-book-form.component';
import { AddPhotoFormComponent } from './pages/home/components/add-photo-form/add-photo-form.component';

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
    FriendItemComponent,
    BookItemComponent,
    GalleryComponent,
    AddFriendFormComponent,
    PersonRequestListComponent,
    AddBookFormComponent,
    AddPhotoFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
