import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PersonModel } from '../models/person.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private BASE_URL: string = `${environment.API}/`;
  private JWT_KEY: string = 'jwt';

  constructor(private http: HttpClient) { }

  public loginUser(person: PersonModel):Observable<any> {
    return this.http.post(`${this.BASE_URL + 'user/token/'}`, person.toLogin());
  }

  public registerUser(person: PersonModel) {
    return this.http.post(`${this.BASE_URL + 'user/register'}`, person.toRegister());
  }

  public saveJWT(jwt: string): void {
    localStorage.setItem(this.JWT_KEY, jwt);
  }

  public userIsLogged(): boolean {
    return localStorage.getItem(this.JWT_KEY) != null;
  }

  public logout(): void {
    localStorage.removeItem(this.JWT_KEY);
  }
}
