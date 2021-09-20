import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PhotoModel } from '../models/photo-model';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private BASE_URL: string = 'http://127.0.0.1:8000/book/';
  private JWT_KEY: string = 'jwt';

  constructor(
    private http: HttpClient
  ) { }

  private getHeader() {
    return { "Authorization": this.getJWTKey() };
  }

  public addPhoto(bookId: number, formData: FormData): Observable<any> {
    // TODO: Ainda não testado
    return this.http.post(
      `${this.BASE_URL}${bookId}/photos`,
      formData,
      { headers: this.getHeader() }
    );
  }

  public peddingPhotos(bookId: number): Observable<PhotoModel[]> {
    // TODO: Ainda não testado
    return this.http.get<PhotoModel[]>(
      `${this.BASE_URL}${bookId}/photos/pending`,
      { headers: this.getHeader() }
    );
  }

  public acceptPhoto(bookId: number, photoId: number): Observable<PhotoModel[]> {
    // TODO: Ainda não testado
    return this.http.put<PhotoModel[]>(
      `${this.BASE_URL}${bookId}/photos/${photoId}`,
      { headers: this.getHeader() }
    );
  }

  public rejectPhoto(bookId: number, photoId: number): Observable<PhotoModel[]> {
    // TODO: Ainda não testado
    return this.http.delete<PhotoModel[]>(
      `${this.BASE_URL}${bookId}/photos/${photoId}`,
      { headers: this.getHeader() }
    );
  }

  private getJWTKey(): string {
    return 'Bearer ' + localStorage.getItem(this.JWT_KEY) || '';
  }
}
