import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Color } from '../../services/color';

import { ListItemComponent } from './list-item.component';

describe('ListItemComponent', () => {
  let component: ListItemComponent;
  let fixture: ComponentFixture<ListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display apply button if selected color is current color', () => {
    const fakeColor: Color = {
      color: '#fff',
    } as Color;

    component.color = fakeColor;
    component.selectedColor = fakeColor;

    // important! make the change detector run
    fixture.detectChanges();

    // Find the button;
    const applyButton = fixture.debugElement.query(By.css('button'));
    expect(applyButton).toBeFalsy();
  });

  it('should display apply button if selected color is different', () => {
    const fakeColor1: Color = {
      color: '#fff',
    } as Color;

    const fakeColor2 = { color: '#ccc' } as Color;

    component.color = fakeColor1;
    component.selectedColor = fakeColor2;

    // important! make the change detector run
    fixture.detectChanges();

    // Find the button;
    const applyButton = fixture.debugElement.query(By.css('button'));
    expect(applyButton).toBeTruthy();
  });

  it('should display apply button if selected color is different', () => {
    const eventSpy = spyOn(component.select, 'emit');

    const fakeColor1: Color = {
      color: '#fff',
    } as Color;
    const fakeColor2 = { color: '#ccc' } as Color;

    component.color = fakeColor1;
    component.selectedColor = fakeColor2;

    // important! make the change detector run
    fixture.detectChanges();

    // Find the button;
    const applyButton = fixture.debugElement.query(By.css('button'));
    applyButton.triggerEventHandler('click', {});
    expect(eventSpy).toHaveBeenCalledWith(fakeColor1);
  });
});
