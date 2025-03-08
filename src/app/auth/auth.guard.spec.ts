import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from './auth.guard';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';

describe('AuthGuard', () => {
  let testObj: AuthGuard;
  let authService: jasmine.SpyObj<AuthenticationService>;
  let router: Router;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthenticationService', ['isAuthenticated']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        { provide: AuthenticationService, useValue: authServiceSpy },
      ],
    });

    testObj = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
    router = TestBed.inject(Router);
  });

  it('should allow access to home if user is authenticated', () => {
    authService.isAuthenticated.and.returnValue(true);

    expect(testObj.canActivate()).toBeTrue();
  });

  it('should block access to home and redirect to login if user is not authenticated', () => {
    authService.isAuthenticated.and.returnValue(false);
    
    spyOn(router, 'navigate');

    expect(testObj.canActivate()).toBeFalse();
    
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
