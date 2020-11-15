import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
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

  it('should return a valid set of colors successfully', () => {
    const mockColors: Color[] = [
      { color: '#ddd' } as Color,
      { color: '#ccc' } as Color,
    ];

    service.getColors$().subscribe({
      next: (result) => expect(result).toBe(mockColors),
      error: () => fail(),
    });

    // Return a valid array with 200
    controller.expectOne(HttpUtils.toApiUrl('colors')).flush(mockColors);
  });

  it('should handle error when colors api runs into an error', () => {
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

    // Return a valid array with 200
    controller
      .expectOne(HttpUtils.toApiUrl('colors'))
      .error(new ErrorEvent('service error'));

    // To simulate custom HTTP status codes
    // controller.expectOne('').event(new HttpResponse({

    // }))
  });

  afterEach(() => controller.verify());
});
