import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticatedUser } from '../login/services/authenticated-user';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  const mockUser: AuthenticatedUser = {
    name: 'mockUser',
    userId: 'user',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', fakeAsync(() => {
    expect(guard).toBeTruthy();
  }));

  it('should allow navigation to pass if localstorage has value', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUser));

    expect(guard.canActivate(null, null)).toBeTruthy();
  });

  it('should not allow navigation and should redirect to login screen if localstorage has no value', () => {
    spyOn(localStorage, 'getItem').and.returnValue('');
    const routerSpy = spyOn(guard['router'], 'navigate');

    expect(guard.canActivate(null, null)).toBeFalsy();
    expect(routerSpy).toHaveBeenCalledWith(['/login']);
  });
});
