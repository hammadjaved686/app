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
import { ListCategoryComponent } from './category/list-category/list-category.component';
import { CustomerLayoutComponent } from './core/customer-layout/customer-layout.component';
import { CartComponent } from './shared/cart/cart.component';
import { CheckoutComponentComponent } from './shared/checkout-component/checkout-component.component';


const routes: Routes = [
  // Other routes
  {
    path: 'authentication',
    loadChildren: () => import('./core/auth/auth.module').then(mod => mod.AuthModule)
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'NotFound', component: NotFoundComponent},
      { path: 'product', component: ListProductComponent},
      { path: 'user', component: ListUserComponent, canActivate: [AuthGuard]},
      { path: 'category', component: ListCategoryComponent, canActivate: [AuthGuard]},
      // Add more routes for other content components
    ],
  },
  {
    path: '',
    component: CustomerLayoutComponent, // Use customerLayout as the layout component
    children: [
      {
        path: 'home',
        component: ListProductComponent // Component to be loaded inside customerLayout
      },
      // Other routes with the same layout
    ]
  },
  {
    path: '',
    component: CustomerLayoutComponent, // Use customerLayout as the layout component
    children: [
      {
        path: 'checkout',
        component: CheckoutComponentComponent // Component to be loaded inside customerLayout
      },
      // Other routes with the same layout
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'not-found', component: NotFoundComponent  },
  { path: 'cart', component: CartComponent  },
  // { path: 'checkout', component: CheckoutComponentComponent  },


  // { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },

  { path: '**', redirectTo: 'not-found' }, // Catch-all route for unknown URLs
    // Other routes
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
