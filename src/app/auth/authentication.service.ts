import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private sessionService: SessionService) {}

  login(email: string, password: string): Observable<string> {
    if (email === 'test@example.com' && password === 'password') {
      return of('random-token-12345').pipe(delay(500)); 
    }
    return of('').pipe(delay(500));
  }

  isAuthenticated(): boolean {
    return !!this.sessionService.getToken();
  }

  logout() {
    this.sessionService.removeToken();
  }
}
