import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const AUTH_API = environment.apiUrl + '/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  //login
  public login(username: string, password: string): Observable<any> {
    return this.httpClient.post(
      AUTH_API + 'login',
      { username, password },
      httpOptions
    );
  }
  //QUESTIONABLE
  public getUser(id: String): Observable<any> {
    return this.httpClient.get(AUTH_API + id, httpOptions);
  }
  //register
  public register(
    id: any,
    username: string,
    password: string,
    emailAddress: string,
    displayName: string
  ): Observable<any> {
    return this.httpClient.post(
      AUTH_API + 'register',
      {
        id,
        username,
        password,
        emailAddress,
        displayName,
      },
      httpOptions
    );
  }
  //modify
  public modify(
    id: any,
    username: string,
    password: string,
    emailAddress: string,
    displayName: string
  ): Observable<any> {
    return this.httpClient.post(
      AUTH_API + 'modify',
      {
        id,
        username,
        password,
        emailAddress,
        displayName,
      },
      httpOptions
    );
  }
}
