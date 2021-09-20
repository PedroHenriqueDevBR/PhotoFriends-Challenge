import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookModel } from '../models/book-model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private BASE_URL: string = 'http://127.0.0.1:8000/book/';
  private JWT_KEY: string = 'jwt';

  constructor(
    private http: HttpClient
  ) { }

  private getHeader() {
    return { "Authorization": this.getJWTKey() };
  }

  public allBooksFromMyFriends(): Observable<BookModel[]> {
    return this.http.get<BookModel[]>(
      `${this.BASE_URL}friends`,
      { headers: this.getHeader() }
    );
  }

  public booksFromFriendByID(id: number): Observable<BookModel[]> {
    return this.http.get<BookModel[]>(
      `${this.BASE_URL}friend/${id}/books`,
      { headers: this.getHeader() }
    );
  }

  private getJWTKey(): string {
    return 'Bearer ' + localStorage.getItem(this.JWT_KEY) || '';
  }
}
