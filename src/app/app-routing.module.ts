import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { LoginComponent } from './core/auth/login/login.component';
import { AuthGuard } from './shared/services/auth.guard';
import { LayoutComponent } from './core/layout/layout.component';
import { ForgetPasswordComponent } from './core/auth/forget-password/forget-password.component';
import { ResetPasswordComponent } from './core/auth/reset-password/reset-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListProductComponent } from './product/list-product/list-product.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { RegisterComponent } from './core/auth/register/register.component';


const routes: Routes = [
  // Other routes
  {
    path: 'authentication',
    loadChildren: () => import('./core/auth/auth.module').then(mod => mod.AuthModule)
  },
  {
    path: '',
    component: LayoutComponent, canActivate: [AuthGuard],
    children: [
      { path: 'NotFound', component: NotFoundComponent},
      { path: 'product', component: ListProductComponent, canActivate: [AuthGuard]},
      { path: 'user', component: ListUserComponent, canActivate: [AuthGuard]},


      // Add more routes for other content components
    ],
  },
  { path: 'login', component: LoginComponent,canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
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
