import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommentModel } from '../models/comment-model';
import { LikeModel } from '../models/like-model';
import { PhotoModel } from '../models/photo-model';

@Injectable({
  providedIn: 'root'
})
export class MetadataImageService {

  private BASE_URL: string = `${environment.API}/book/`;
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

  public getPhotosFromBook(bookID: number): Observable<PhotoModel[]> {
    return this.http.get<PhotoModel[]>(
      `${this.BASE_URL}${bookID}/photos`,
      { headers: this.getHeader() }
    );
  }

  public getLikesFromPhoto(photoId: number): Observable<LikeModel[]> {
    return this.http.get<LikeModel[]>(
      `${this.BASE_URL}photo/${photoId}/like/`,
      { headers: this.getHeader() }
    );
  }

  public addComment(photoId: number, comment: CommentModel): Observable<any> {
    return this.http.post(
      `${this.BASE_URL}photo/${photoId}/comment/`,
      comment.toCreate(),
      { headers: this.getHeader() }
    );
  }

  public getCommentsFromPhoto(photoId: number): Observable<CommentModel[]> {
    return this.http.get<CommentModel[]>(
      `${this.BASE_URL}photo/${photoId}/comment/`,
      { headers: this.getHeader() }
    );
  }

  public updateComment(photoId: number, comment: CommentModel): Observable<any> {
    return this.http.put(
      `${this.BASE_URL}photo/${photoId}/comment/`,
      comment.toCreate(),
      { headers: this.getHeader() }
    );
  }

  public deleteComment(photoId: number, comment: CommentModel): Observable<any> {
    return this.http.delete(
      `${this.BASE_URL}photo/${photoId}/comment/`,
      { headers: this.getHeader() }
    );
  }

  private getJWTKey(): string {
    return 'Bearer ' + localStorage.getItem(this.JWT_KEY) || '';
  }
}
