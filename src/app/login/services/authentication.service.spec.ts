import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpUtils } from 'src/app/utils/httpUtils';
import { Logger } from 'src/app/utils/logger';
import { AuthRequest } from './auth-request';
import { AuthenticatedUser } from './authenticated-user';

import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthenticationService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle authenticate api call success', () => {
    const mockUser: AuthenticatedUser = {
      name: 'mockuser',
      userId: 'userid',
    };

    service.authenticate$({} as AuthRequest).subscribe({
      next: (r) => {
        expect(r).toBe(mockUser);
      },
      error: fail,
    });

    controller
      .expectOne(HttpUtils.toApiUrl('authentication/authenticate'))
      .flush(mockUser);
  });

  describe('validate authenticate login errors', () => {
    let loggerSpy: jasmine.Spy;

    beforeEach(() => (loggerSpy = spyOn(Logger, 'error')));

    it('should handle invalid credentials', () => {
      service.authenticate$({} as AuthRequest).subscribe({
        next: fail,
        error: (e: string) => {
          expect(e).toBe(AuthenticationService.invalidLoginCredentials);
          expect(loggerSpy).toHaveBeenCalledWith(
            'AuthenticationService',
            'authenticate$',
            jasmine.anything()
          );
        },
      });

      controller
        .expectOne(HttpUtils.toApiUrl(`authentication/authenticate`))
        .error(new ErrorEvent('service error'), { status: 401 });
    });

    it('should handle unknown server error', () => {
      service.authenticate$({} as AuthRequest).subscribe({
        next: fail,
        error: (e: string) => {
          expect(e).toBe(AuthenticationService.loginGeneralErrorMessage);
          expect(loggerSpy).toHaveBeenCalledWith(
            'AuthenticationService',
            'authenticate$',
            jasmine.anything()
          );
        },
      });

      controller
        .expectOne(HttpUtils.toApiUrl(`authentication/authenticate`))
        .error(new ErrorEvent('service error'), { status: 500 });
    });
  });

  afterEach(() => controller.verify());
});
