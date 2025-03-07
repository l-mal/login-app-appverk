import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = '/assets/user-data.json';

  constructor(private http: HttpClient) {}

  getUserData(): Observable<User> {
    return this.http.get<User>(this.apiUrl);
  }
}
