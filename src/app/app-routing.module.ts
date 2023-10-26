import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './geo-sol-authentication/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { HomeComponent } from '../../src/app/home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { ForgetPasswordComponent } from './geo-sol-authentication/forget-password/forget-password.component';
import { ResetPasswordComponent } from './geo-sol-authentication/reset-password/reset-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardInitiateRequestTellerComponent } from './dashboard-initiate-request-teller/dashboard-initiate-request-teller.component';


const routes: Routes = [
  // Other routes
  {
    path: 'authentication',
    loadChildren: () => import('./geo-sol-authentication/geo-sol-authentication.module').then(mod => mod.GeoSolAuthenticationModule)
  },
  {
    path: '',
    component: LayoutComponent, canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'NotFound', component: NotFoundComponent, canActivate: [AuthGuard] },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'dashboardInitiateRequest', component: DashboardInitiateRequestTellerComponent },

      // Add more routes for other content components
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgetPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'not-found', component: NotFoundComponent  },
  // { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },

  { path: '**', redirectTo: 'not-found' }, // Catch-all route for unknown URLs
    // Other routes
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
