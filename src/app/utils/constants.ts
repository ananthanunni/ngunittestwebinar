import { Direction } from '@angular/cdk/bidi';
import { MatSnackBarConfig } from '@angular/material/snack-bar';

export class Constants {
  static readonly snackBarErrorConfig: MatSnackBarConfig = {
    duration: 2000,
    verticalPosition: 'top',
    horizontalPosition: 'end',
  };

  static readonly authenticatedUserLocalStorageKey = 'authentication';
}
