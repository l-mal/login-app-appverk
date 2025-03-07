import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private tokenKey = 'authToken';

  public getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  public saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  public removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
