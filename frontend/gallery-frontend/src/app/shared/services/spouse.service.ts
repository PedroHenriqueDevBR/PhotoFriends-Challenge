import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpouseService {

  private BASE_URL: string = '/server/spouse/';
  private JWT_KEY: string = 'jwt';

  constructor(private http: HttpClient) { }

  private getHeader() {
    return { "Authorization": this.getJWTKey() };
  }

  public createSpouseInvite(id: number): Observable<any> {
    return this.http.post(
      `${this.BASE_URL}`,
      { "target_id": id },
      { headers: this.getHeader() }
    );
  }

  public acceptInvitation(inviteID: number): Observable<any> {
    return this.http.put(
      `${this.BASE_URL + 'response/' + inviteID}`,
      {},
      { headers: this.getHeader() }
    );
  }

  public rejectInvitation(inviteID: number): Observable<any> {
    return this.http.delete(
      `${this.BASE_URL + 'response/' + inviteID}`,
      { headers: this.getHeader() }
    );
  }

  public getMySpouseInvitations() {
    return this.http.get(
      `${this.BASE_URL}`,
      { headers: this.getHeader() }
    )
  }

  private getJWTKey(): string {
    return 'Bearer ' + localStorage.getItem(this.JWT_KEY) || '';
  }
}
