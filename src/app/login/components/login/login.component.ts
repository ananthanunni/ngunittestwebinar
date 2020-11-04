import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'ar-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  constructor(private authenticationService: AuthenticationService) {}
}
