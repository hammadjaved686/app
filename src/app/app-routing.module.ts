import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './geo-sol-authentication/login/login.component';
import { HeaderComponent } from './shared/header/header.component';
const routes: Routes = [
  // Other routes
  {
    path: 'authentication',
    loadChildren: () => import('./geo-sol-authentication/geo-sol-authentication.module').then(mod => mod.GeoSolAuthenticationModule)
  },
  { path: 'login', component: LoginComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' } // Catch-all route for unknown URLs

  // Other routes
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
