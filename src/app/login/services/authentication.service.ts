import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpUtils } from 'src/app/utils/httpUtils';
import { AuthRequest } from './auth-request';
import { catchError } from 'rxjs/operators';
import { Logger } from '../../utils/logger';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  authenticate$(credentials: AuthRequest): Observable<string> {
    return this.http
      .post<string>(
        HttpUtils.toApiUrl(`authentication/authenticate`),
        credentials
      )
      .pipe(
        catchError((e: HttpErrorResponse) => {
          Logger.error('AuthenticationService', 'authenticate$', e.message);
          return throwError(e);
        })
      );
  }
}
