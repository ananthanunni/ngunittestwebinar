import {
  async,
  ComponentFixture,
  fakeAsync,
  flushMicrotasks,
  TestBed,
  tick,
} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticatedUser } from '../../services/authenticated-user';
import { of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { NgModule } from '@angular/core';
import { Constants } from 'src/app/utils/constants';

@NgModule({
  id: 'mock-component',
})
class MockComponent {}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'secure', component: MockComponent },
        ]),
        MatSnackBarModule,
        NoopAnimationsModule,
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

  // PLACEHOLDER UNIT TEST FOR ASYNC
  it('attempt time travel', fakeAsync(() => {
    let value = true;

    setTimeout(() => {
      value = false;
      expect(value).toBeFalsy();
    }, 3000);

    tick(3500);
  }));

  describe('Validate login button disabled', () => {
    it('should not enable login button if user id is empty', async () => {
      component.loginForm.controls.userId.setValue('');
      component.loginForm.controls.password.setValue('nonemptypassword');

      component.loginForm.updateValueAndValidity();
      fixture.detectChanges();
      await fixture.whenRenderingDone();

      const loginButton = fixture.debugElement.query(
        By.css('button[type=submit]')
      );
      expect(loginButton.attributes.disabled).toBeTruthy();
    });

    it('should not enable login button if password is empty', async () => {
      component.loginForm.controls.userId.setValue('validusername');
      component.loginForm.controls.password.setValue('');

      component.loginForm.updateValueAndValidity();
      fixture.detectChanges();

      const loginButton = fixture.debugElement.query(
        By.css('button[type=submit]')
      );
      expect(loginButton.attributes.disabled).toBeTruthy();
    });

    it('should enable login button if fields have value', async () => {
      component.loginForm.controls.userId.setValue('validusername');
      component.loginForm.controls.password.setValue('nonemptypassword');

      component.loginForm.updateValueAndValidity();
      fixture.detectChanges();
      const loginButton = fixture.debugElement.query(
        By.css('button[type=submit]')
      );
      expect(loginButton.attributes.disabled).toBeTruthy();
    });
  });

  describe('validate login button click', () => {
    let serviceSpy: jasmine.Spy;
    const mockUser: AuthenticatedUser = {
      name: 'mockuser',
      userId: 'mockuserid',
    };

    beforeEach(() => {
      serviceSpy = spyOn(component['authenticationService'], 'authenticate$');
    });

    it('should call validate api with correct values', () => {
      component.loginForm.controls.userId.setValue('validusername');
      component.loginForm.controls.password.setValue('nonemptypassword');
      const loginButton = fixture.debugElement.query(
        By.css('button[type=submit]')
      );
      loginButton.triggerEventHandler('click', {});

      expect(serviceSpy).toHaveBeenCalledWith({
        userId: 'validusername',
        password: 'nonemptypassword',
      });
    });

    it('should handle successful authentication', fakeAsync(async () => {
      const localStorageSpy = spyOn(
        localStorage,
        'setItem'
      ).and.callFake(() => {});
      const routerSpy = spyOn(component['router'], 'navigate');

      // a delay is required for the system to see the change and react.
      serviceSpy.and.returnValue(of(mockUser).pipe(delay(1000)));
      const loginButton = fixture.debugElement.query(
        By.css('button[type=submit]')
      );
      loginButton.triggerEventHandler('click', {});
      fixture.detectChanges();
      await fixture.whenStable();
      expect(loginButton.nativeElement.innerText).toBe('Logging in...');
      tick(1000);
      fixture.detectChanges();
      expect(loginButton.nativeElement.innerText).toBe('Login');
      expect(localStorageSpy).toHaveBeenCalledWith(
        Constants.authenticatedUserLocalStorageKey,
        JSON.stringify(mockUser)
      );
      expect(routerSpy).toHaveBeenCalledWith(['/secure']);
    }));

    it('should handle failed authentication', () => {
      serviceSpy.and.returnValue(throwError('Login rejected'));
      const snackBarSpy = spyOn(component['snackbar'], 'open');

      fixture.debugElement
        .query(By.css('button[type=submit]'))
        .triggerEventHandler('click', {});
      expect(snackBarSpy).toHaveBeenCalledWith(
        'Login rejected',
        '',
        Constants.snackBarErrorConfig
      );
    });
  });

  it('should clear fields when clicking clear button', () => {
    component.loginForm.controls.userId.setValue('validusername');
    component.loginForm.controls.password.setValue('nonemptypassword');

    // selects first matched item
    const clearButton = fixture.debugElement.query(By.css('button'));
    clearButton.triggerEventHandler('click', {});

    const inputs = fixture.debugElement.queryAll(By.css('input'));
    expect(inputs[0].nativeElement.value).toBeFalsy();
    expect(inputs[1].nativeElement.value).toBeFalsy();
  });
});
