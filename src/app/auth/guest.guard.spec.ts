import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GuestGuard } from './guest.guard';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';

describe('GuestGuard', () => {
  let testObj: GuestGuard;
  let authService: jasmine.SpyObj<AuthenticationService>;
  let router: Router;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthenticationService', ['isAuthenticated']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        GuestGuard,
        { provide: AuthenticationService, useValue: authServiceSpy },
      ],
    });

    testObj = TestBed.inject(GuestGuard);
    authService = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
    router = TestBed.inject(Router);
  });

  it('should allow access to login if user is not authenticated', () => {
    authService.isAuthenticated.and.returnValue(false);

    expect(testObj.canActivate()).toBeTrue();
  });

  it('should block access to login and redirect to home if user is authenticated', () => {
    authService.isAuthenticated.and.returnValue(true);
    
    spyOn(router, 'navigate');

    expect(testObj.canActivate()).toBeFalse();
    
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });
});
