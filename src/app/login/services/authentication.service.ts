import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpUtils } from 'src/app/utils/httpUtils';
import { AuthRequest } from './auth-request';
import { catchError } from 'rxjs/operators';
import { Logger } from '../../utils/logger';
import { AuthenticatedUser } from './authenticated-user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  static readonly invalidLoginCredentials =
    'Incorrect user id or password. Please try again.';
  static readonly loginGeneralErrorMessage =
    'Oops! Something went wrong logging in.';

  constructor(private http: HttpClient) {}

  authenticate$(credentials: AuthRequest): Observable<AuthenticatedUser> {
    return this.http
      .post<AuthenticatedUser>(
        HttpUtils.toApiUrl(`authentication/authenticate`),
        credentials
      )
      .pipe(
        catchError((e: HttpErrorResponse) => {
          Logger.error('AuthenticationService', 'authenticate$', e.message);

          if (e.status === 401) {
            return throwError(AuthenticationService.invalidLoginCredentials);
          }

          return throwError(AuthenticationService.loginGeneralErrorMessage);
        })
      );
  }
}
