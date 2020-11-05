import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpUtils } from 'src/app/utils/httpUtils';
import { Logger } from 'src/app/utils/logger';
import { Color } from './color';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  constructor(private http: HttpClient) {}

  getColors$(): Observable<Color[]> {
    return this.http.get<Color[]>(HttpUtils.toApiUrl('colors')).pipe(
      catchError((e: HttpErrorResponse) => {
        Logger.error('ColorService', 'getColors$', e.message);

        return throwError('Oops! Something went wrong while loading colors.');
      })
    );
  }
}
