import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, tap } from 'rxjs/operators';
import { AuthenticationService } from '../../services/authentication.service';
import { AuthenticatedUser } from '../../services/authenticated-user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Constants } from '../../../utils/constants';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'ar-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoggingIn: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar,
    private changeDetector: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.initialize();
  }

  onLoginClicked(): void {
    this.isLoggingIn = true;
    this.changeDetector.markForCheck();

    this.authenticationService
      .authenticate$({
        userId: this.loginForm.controls.userId.value,
        password: this.loginForm.controls.password.value,
      })
      .pipe(
        finalize(() => {
          this.isLoggingIn = false;
          this.changeDetector.markForCheck();
        })
      )
      .subscribe({
        next: (user: AuthenticatedUser) => {
          this.onLoginSuccess(user);
        },
        error: (e: string) => {
          this.snackbar.open(e, '', Constants.snackBarErrorConfig);
        },
      });
  }

  onClearClicked(): void {
    this.loginForm.setValue({
      userId: '',
      password: '',
    });
  }

  private initialize(): void {
    this.document.title = 'Login';

    this.loginForm = this.formBuilder.group({
      userId: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.changeDetector.markForCheck();
  }

  private onLoginSuccess(user: AuthenticatedUser): void {
    localStorage.setItem(
      Constants.authenticatedUserLocalStorageKey,
      JSON.stringify(user)
    );
    this.router.navigate(['/secure']);
  }
}
