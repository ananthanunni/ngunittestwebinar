import { HttpClientTestingModule } from '@angular/common/http/testing';
import { serializeNodes } from '@angular/compiler/src/i18n/digest';
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockComponent } from 'ng-mocks/dist/lib/mock-component/mock-component';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Color } from '../../services/color';
import { ListItemComponent } from '../list-item/list-item.component';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  const mockColors: Color[] = [
    { id: 1, color: '#aaa', name: 'color a', pantoneValue: 'hmmm' },
    { id: 1, color: '#bbb', name: 'color b', pantoneValue: 'wut' },
    { id: 1, color: '#ccc', name: 'color c', pantoneValue: 'wat' },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ListComponent, MockComponent(ListItemComponent)],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show loading indicator and correctly display the tiles', fakeAsync(() => {
    const serviceSpy = spyOn(
      component['colorService'],
      'getColors$'
    ).and.returnValue(of(mockColors).pipe(delay(1000)));

    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.list'))).toBeFalsy();
    expect(fixture.debugElement.nativeElement.innerHTML).toContain(
      'Loading...'
    );
    tick(3500);
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.innerHTML).not.toContain(
      'Loading...'
    );
    expect(fixture.debugElement.query(By.css('.list'))).toBeTruthy();
    const childTiles = fixture.debugElement.queryAll(
      By.directive(ListItemComponent)
    );
    expect(childTiles.length).toBe(mockColors.length);
    expect(serviceSpy).toHaveBeenCalledTimes(1);
  }));

  it('should change selected color when a list item emits selection event', () => {
    const serviceSpy = spyOn(
      component['colorService'],
      'getColors$'
    ).and.returnValue(of(mockColors));
    fixture.detectChanges();
    const childTiles = fixture.debugElement.queryAll(
      By.directive(ListItemComponent)
    );
    const firstTile = childTiles[0].componentInstance as ListItemComponent;

    expect(component.selectedColor).toBeFalsy();
    firstTile.select.emit(firstTile.color);
    expect(component.selectedColor).toBe(mockColors[0]);
  });
});
