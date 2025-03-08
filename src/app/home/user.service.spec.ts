import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from './user.interface';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch user data', () => {
    const mockUserData: User = { firstName: "John", lastName: "Doe", email: "test@email.com" };

    service.getUserData().subscribe(data => {
      expect(data).toEqual(mockUserData);
    });

    const req = httpMock.expectOne('/assets/user-data.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockUserData);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
