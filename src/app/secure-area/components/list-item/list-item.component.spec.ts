import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Color } from '../../services/color';

import { ListItemComponent } from './list-item.component';

describe('ListItemComponent', () => {
  let component: ListItemComponent;
  let fixture: ComponentFixture<ListItemComponent>;
  const mockColor: Color = {
    color: '#ddd',
    id: 1,
    name: 'whatever',
    pantoneValue: 'ac',
  };

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

  it('should not display apply button if the selected color is the current color', () => {
    component.color = mockColor;
    component.selectedColor = mockColor;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('button'))).toBeFalsy();
  });

  it('should display apply button if the selected color is the current color', () => {
    component.color = mockColor;
    component.selectedColor = {
      color: '#fff',
      name: 'anothercolor',
      id: 2,
      pantoneValue: 'xyz',
    } as Color;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('button'))).toBeTruthy();
  });

  it('should emit select event when clicking the button', () => {
    const eventSpy = spyOn(component['select'], 'emit');
    component.color = mockColor;
    component.selectedColor = {
      color: '#fff',
      name: 'anothercolor',
      id: 2,
      pantoneValue: 'xyz',
    } as Color;
    fixture.detectChanges();
    fixture.debugElement
      .query(By.css('button'))
      .triggerEventHandler('click', {});
    expect(eventSpy).toHaveBeenCalledWith(mockColor);
  });
});
