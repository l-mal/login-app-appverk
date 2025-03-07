import { TestBed } from '@angular/core/testing';
import { SessionService } from './session.service';

describe('SessionService', () => {
  let testObj: SessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    testObj = TestBed.inject(SessionService);
  });

  beforeEach(() => {
       localStorage.clear();
  });

  it('should be created', () => {
    expect(testObj).toBeTruthy();
  });

  it('should save token to localStorage', () => {
    const token = 'sample-token';
    testObj.saveToken(token);

    expect(localStorage.getItem('authToken')).toBe(token);
  });

  it('should get token from localStorage', () => {
    const token = 'sample-token';
    localStorage.setItem('authToken', token);

    const retrievedToken = testObj.getToken();

    expect(retrievedToken).toBe(token);
  });

  it('should return null if token is not in localStorage', () => {
    const token = testObj.getToken();
    
    expect(token).toBeNull();
  });

  it('should remove token from localStorage', () => {
    localStorage.setItem('authToken', 'sample-token');

    testObj.removeToken();

    expect(localStorage.getItem('authToken')).toBeNull();
  });
});
