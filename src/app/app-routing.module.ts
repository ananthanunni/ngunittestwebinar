import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((r) => r.LoginModule),
  },
  {
    path: 'secure',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./secure-area/secure-area.module').then(
        (r) => r.SecureAreaModule
      ),
  },
  {
    path: '**',
    redirectTo: 'secure',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
