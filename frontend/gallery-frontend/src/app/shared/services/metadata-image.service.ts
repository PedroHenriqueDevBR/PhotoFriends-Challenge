import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LikeModel } from '../models/like-model';

@Injectable({
  providedIn: 'root'
})
export class MetadataImageService {

  private BASE_URL: string = 'http://127.0.0.1:8000/book/';
  private JWT_KEY: string = 'jwt';

  constructor(
    private http: HttpClient
  ) { }

  private getHeader() {
    return { "Authorization": this.getJWTKey() };
  }

  public addLike(photoId: number): Observable<any> {
    return this.http.post(
      `${this.BASE_URL}photo/${photoId}/like/`,
      {},
      { headers: this.getHeader() }
    );
  }

  public getLikesFromPhoto(photoId: number): Observable<LikeModel[]> {
    return this.http.get<LikeModel[]>(
      `${this.BASE_URL}photo/${photoId}/like/`,
      { headers: this.getHeader() }
    );
  }

  private getJWTKey(): string {
    return 'Bearer ' + localStorage.getItem(this.JWT_KEY) || '';
  }
}
