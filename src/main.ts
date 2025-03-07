import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, Route } from '@angular/router';
import { HomeComponent } from './app/home/home.component';
import { LoginComponent } from './app/auth/login/login.component';
import { GuestGuard } from './app/auth/guest.guard';
import { AuthGuard } from './app/auth/auth.guard';
import { provideHttpClient } from '@angular/common/http';

const routes: Route[] = [
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' },
];

bootstrapApplication(AppComponent, {
  providers: [
     provideRouter(routes),
     provideHttpClient(),
  ]
});
