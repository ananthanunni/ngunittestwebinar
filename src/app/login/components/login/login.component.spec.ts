import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

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

  it('should call validate api with correct values', () => {
    const serviceSpy = spyOn(
      component['authenticationService'],
      'authenticate$'
    );

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
});
