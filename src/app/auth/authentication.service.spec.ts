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
        { provide: SessionService, useClass: sessionService },
        { provide: Router, useClass: router }
      ]
    });

    testObj = TestBed.inject(AuthenticationService);
    sessionService = TestBed.inject(SessionService as any);
    router = TestBed.inject(Router as any);
  });

  it('should be created', () => {
    expect(testObj).toBeTruthy();
  });

  it('should save token and navigate to home on successful login', () => {
    const spySaveToken = spyOn(sessionService, 'saveToken');
    const spyNavigate = spyOn(router, 'navigate');

    testObj.login('test@example.com', 'password123');
    
    expect(spySaveToken).toHaveBeenCalled();
    expect(spyNavigate).toHaveBeenCalledWith(['/home']);
  });

  it('should return true if user is authenticated', () => {
    sessionService.saveToken('validToken');
    
    const isAuthenticated = testObj.isAuthenticated();
    
    expect(isAuthenticated).toBeTrue();
  });

  it('should return false if user is not authenticated', () => {
    sessionService.removeToken();
    
    const isAuthenticated = testObj.isAuthenticated();
    
    expect(isAuthenticated).toBeFalse();
  });

  it('should remove token and navigate to login on logout', () => {
    const spyRemoveToken = spyOn(sessionService, 'removeToken');
    const spyNavigate = spyOn(router, 'navigate');

    testObj.logout();
    
    expect(spyRemoveToken).toHaveBeenCalled();
    expect(spyNavigate).toHaveBeenCalledWith(['/login']);
  });
});
