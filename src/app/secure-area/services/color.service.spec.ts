import { HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpUtils } from 'src/app/utils/httpUtils';
import { Logger } from 'src/app/utils/logger';
import { Color } from './color';

import { ColorService } from './color.service';

describe('ColorService', () => {
  let service: ColorService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ColorService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return valid results on success', () => {
    const mockResponse = [{ color: '#ddd' } as Color];

    service.getColors$().subscribe({
      next: (r: Color[]) => {
        expect(r).toEqual(mockResponse);
      },
      error: () => fail(),
    });

    // const a = { a: 1 };
    // const b = { a: 1 };
    // expect(a).toBe(b)    //evals to false
    // expect(a).toEqual(b);//evals to true

    controller.expectOne(HttpUtils.toApiUrl('colors')).flush(mockResponse);
  });

  it('should log error when getting colors api call runs into an error', () => {
    const loggerSpy = spyOn(Logger, 'error');

    service.getColors$().subscribe({
      next: () => fail(),
      error: (e: string) => {
        expect(loggerSpy).toHaveBeenCalledWith(
          'ColorService',
          'getColors$',
          jasmine.anything()
        );

        expect(e).toBe('Oops! Something went wrong while loading colors.');
      },
    });

    controller
      .expectOne(HttpUtils.toApiUrl('colors'))
      .error(new ErrorEvent('service error'));
  });

  afterEach(() => controller.verify());
});
