import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PhotoModel } from '../models/photo-model';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private BASE_URL: string = '/server/book/';
  private JWT_KEY: string = 'jwt';

  constructor(
    private http: HttpClient
  ) { }

  private getHeader() {
    return { "Authorization": this.getJWTKey() };
  }

  public addPhoto(bookId: number, formData: FormData): Observable<any> {
    return this.http.post(
      `${this.BASE_URL}${bookId}/photos`,
      formData,
      { headers: this.getHeader() }
    );
  }

  public peddingPhotos(bookId: number): Observable<PhotoModel[]> {
    return this.http.get<PhotoModel[]>(
      `${this.BASE_URL}${bookId}/photos/pending`,
      { headers: this.getHeader() }
    );
  }

  public acceptPhoto(bookId: number, photoId: number): Observable<any> {
    return this.http.put(
      `${this.BASE_URL}${bookId}/photos/${photoId}`,
      {},
      { headers: this.getHeader() }
    );
  }

  public rejectPhoto(bookId: number, photoId: number): Observable<any> {
    return this.http.delete(
      `${this.BASE_URL}${bookId}/photos/${photoId}`,
      { headers: this.getHeader() }
    );
  }

  private getJWTKey(): string {
    return 'Bearer ' + localStorage.getItem(this.JWT_KEY) || '';
  }
}
