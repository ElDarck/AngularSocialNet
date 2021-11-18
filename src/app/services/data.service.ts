import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from "../../environments/environment";
import { User } from "../models/user";

@Injectable({ providedIn: 'root' })
export class DataService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(<string>localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login( email: any, password: any,) {
    return this.http.post<User>(`${environment.apiUrl}/login`, { email, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        if (user.user && user.accessToken) {
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
        }

        return user;
      }))
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null!);
    this.router.navigate(['/login']);
  }

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/users/`, user);
  }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  getById(id: string) {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }

  update(id: string, params: any, accessToken: any) {
    return this.http.patch(`${environment.apiUrl}/users/${id}`, params, { headers:
        { Authorization: "Bearer " + accessToken } })
      .pipe(map(x => {
        if (id == this.userValue.user.id) {
          // update local storage
          const user = { ...this.userValue, ...params };
          localStorage.setItem('user', JSON.stringify(user));

          // publish updated user to subscribers
          this.userSubject.next(user);
        }
        return x;
      }));
  }

  delete( id: string, accessToken: any) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`, { headers:
    { Authorization: "Bearer " + accessToken } });
  }
}
