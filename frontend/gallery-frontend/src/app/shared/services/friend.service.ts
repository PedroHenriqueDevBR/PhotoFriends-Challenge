import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  private BASE_URL: string = `${environment.API}/user/friend/`;
  private JWT_KEY: string = 'jwt';

  constructor(private http: HttpClient) { }

  private getHeader() {
    return { "Authorization": this.getJWTKey() };
  }

  public createFriendInvite(username: string): Observable<any> {
    return this.http.post(
      `${this.BASE_URL + ''}`,
      { "username": username },
      { headers: this.getHeader() }
    );
  }

  public acceptInvitation(inviteID: number): Observable<any> {
    return this.http.put(
      `${this.BASE_URL + 'invitations/' + inviteID}`,
      {},
      { headers: this.getHeader() }
    );
  }

  public rejectInvitation(inviteID: number): Observable<any> {
    return this.http.delete(
      `${this.BASE_URL + 'invitations/' + inviteID}`,
      { headers: this.getHeader() }
    );
  }

  public getMyFriends() {
    return this.http.get(
      `${this.BASE_URL}`,
      { headers: this.getHeader() }
    )
  }

  public getMyFriendInvitations() {
    return this.http.get(
      `${this.BASE_URL}invitations/received`,
      { headers: this.getHeader() }
    )
  }

  private getJWTKey(): string {
    return 'Bearer ' + localStorage.getItem(this.JWT_KEY) || '';
  }
}
