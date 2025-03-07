import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private sessionService: SessionService, private router: Router) {}

  public login(email: string, password: string): void {
    if (email && password) {
      this.sessionService.saveToken(this.generateRandomToken());
      this.router.navigate(['/home']);
    }
  }

  public isAuthenticated(): boolean {
    const token = this.sessionService.getToken();
    return token != null && token !== '';
  }

  public logout() {
    this.sessionService.removeToken();
    this.router.navigate(['/login']);
  }

  private generateRandomToken(): string {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      token += charset[randomIndex];
    }
    return token;
  }
}
