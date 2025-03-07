import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './app/home/home.component';
import { LoginComponent } from './app/auth/login/login.component';
import { GuestGuard } from './app/auth/guest.guard';
import { AuthGuard } from './app/auth/auth.guard';

const routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes)
  ]
});
