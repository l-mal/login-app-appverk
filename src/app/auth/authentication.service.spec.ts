import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { SessionService } from './session.service';
import { Router } from '@angular/router';

describe('AuthenticationService', () => {
  let testObj: AuthenticationService;
  let sessionService: jasmine.SpyObj<SessionService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    sessionService = jasmine.createSpyObj('SessionService', ['saveToken', 'getToken', 'removeToken']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthenticationService,
        { provide: SessionService, useValue: sessionService },
        { provide: Router, useValue: router }
      ]
    });

    testObj = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(testObj).toBeTruthy();
  });

  it('should save token and navigate to home on successful login', () => {
    sessionService.getToken.and.returnValue(null); 

    testObj.login('test@example.com', 'password123');
    
    expect(sessionService.saveToken).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should return true if user is authenticated', () => {
    sessionService.getToken.and.returnValue('validToken');
    
    const isAuthenticated = testObj.isAuthenticated();
    
    expect(isAuthenticated).toBeTrue();
  });

  it('should return false if user is not authenticated', () => {
    sessionService.getToken.and.returnValue(null);
    
    const isAuthenticated = testObj.isAuthenticated();
    
    expect(isAuthenticated).toBeFalse();
  });

  it('should remove token and navigate to login on logout', () => {
    testObj.logout();
    
    expect(sessionService.removeToken).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
