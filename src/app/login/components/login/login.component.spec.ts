import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MatSnackBarModule,
      ],
      declarations: [LoginComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Validate login button disabled', () => {
    let userIdInput: DebugElement;
    let passwordInput: DebugElement;
    let loginButton: DebugElement;

    beforeEach(() => {
      const inputFields = fixture.debugElement.queryAll(By.css('input'));
      userIdInput = inputFields[0];
      passwordInput = inputFields[1];
      loginButton = fixture.debugElement.query(By.css('button[type=submit]'));
    });

    it('should not enable login button if user id is empty', () => {
      userIdInput.nativeElement.value = '';
      passwordInput.nativeElement.value = 'nonemptypassword';

      userIdInput.triggerEventHandler('change', {});
      passwordInput.triggerEventHandler('change', {});

      expect(loginButton.nativeElement.disabled).toBeTruthy();
    });

    it('should not enable login button if password is empty', () => {
      userIdInput.nativeElement.value = 'validusername';
      passwordInput.nativeElement.value = '';

      userIdInput.triggerEventHandler('change', {});
      passwordInput.triggerEventHandler('change', {});

      expect(loginButton.nativeElement.disabled).toBeTruthy();
    });

    it('should enable login button if fields have value', async () => {
      userIdInput.nativeElement.value = 'validusername';
      passwordInput.nativeElement.value = 'validpassword';

      userIdInput.triggerEventHandler('change', {});
      passwordInput.triggerEventHandler('change', {});

      component.loginForm.updateValueAndValidity();

      fixture.detectChanges();
      await fixture.whenStable();

      expect(loginButton.nativeElement.disabled).toBeTruthy();
    });
  });
});
