import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from './user.interface';
import { UserService } from './user.service';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from '../auth/authentication.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public user: User;
  private unsubscribe: Subject<void> = new Subject<void>();

  constructor(private userService: UserService, private authService: AuthenticationService) {
    this.user = {
      firstName: '',
      lastName: '',
      email: ''
    };
  }

  ngOnInit(): void {
    this.userService.getUserData().pipe(takeUntil(this.unsubscribe)).subscribe((data: User) => {
      this.user = data;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  logout(): void {
    this.authService.logout();
  }
}
