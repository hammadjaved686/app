import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { LoginComponent } from './core/auth/login/login.component';
import { AuthGuard } from './shared/services/auth.guard';
import { AuthAdminGuard } from './shared/services/auth-admin.guard';

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
import { BlogComponent } from './shared/blog/blog.component';
import { ContactsComponent } from './shared/contacts/contacts.component';
import { VendorComponent } from './shared/vendor/vendor.component';
import { ShopComponent } from './product/shop/shop.component';
import { ProductDetailsModalComponent } from './product/product-details-modal/product-details-modal.component';
import { InvoiceComponent } from './shared/invoice/invoice.component';
import { WishlistComponent } from './shared/wishlist/wishlist.component';


const routes: Routes = [
  // Other routes
  {
    path: 'authentication',
    loadChildren: () => import('./core/auth/auth.module').then(mod => mod.AuthModule)
  },
  {
    path: 'admin',
    component: LayoutComponent,
    children: [
      { path: 'NotFound', component: NotFoundComponent},
      { path: '', component: ListProductComponent},
      { path: 'product', component: ListProductComponent},
      { path: 'user', component: ListUserComponent, canActivate: [AuthAdminGuard]},
      { path: 'category', component: ListCategoryComponent, canActivate: [AuthAdminGuard]},
      // Add more routes for other content components
    ],
  },
  {
    path: '',
    component: CustomerLayoutComponent, // Use customerLayout as the layout component
    children: [
      {
        path: '',
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
        path: 'shop',
        component: ShopComponent // Component to be loaded inside customerLayout
      },
      // Other routes with the same layout
    ]
  },
  {
    path: '',
    component: CustomerLayoutComponent, // Use customerLayout as the layout component
    children: [
      {
        path: 'blog',
        component: BlogComponent // Component to be loaded inside customerLayout
      },
      // Other routes with the same layout
    ]
  },
  {
    path: '',
    component: CustomerLayoutComponent, // Use customerLayout as the layout component
    children: [
      {
        path: 'contacts',
        component: ContactsComponent // Component to be loaded inside customerLayout
      },
      // Other routes with the same layout
    ]
  },
  {
    path: '',
    component: CustomerLayoutComponent, // Use customerLayout as the layout component
    children: [
      {
        path: 'vendor',
        component: VendorComponent // Component to be loaded inside customerLayout
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
  {
    path: '',
    component: CustomerLayoutComponent, // Use customerLayout as the layout component
    children: [
      {
        path: 'product/:id',
        component: ProductDetailsModalComponent // Component to be loaded inside customerLayout
      },
      // Other routes with the same layout
    ]
  },
  {
    path: '',
    component: CustomerLayoutComponent, // Use customerLayout as the layout component
    children: [
      {
        path: 'cart',
        component: CartComponent // Component to be loaded inside customerLayout
      },
      // Other routes with the same layout
    ]
  },
  {
    path: '',
    component: CustomerLayoutComponent, // Use customerLayout as the layout component
    children: [
      {
        path: 'invoice',
        component: InvoiceComponent // Component to be loaded inside customerLayout
      },
      // Other routes with the same layout
    ]
  },
  {
    path: '',
    component: CustomerLayoutComponent, // Use customerLayout as the layout component
    children: [
      {
        path: 'wishlist',
        component: WishlistComponent // Component to be loaded inside customerLayout
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
