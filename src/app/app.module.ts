import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider'; // Example module, import the ones you need
import { MatTable, MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './geo-sol-interceptors/error.interceptor';
import { LoggerService } from './shared/services/logger.service';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './shared/services/http.service';
import { HeaderComponent } from './core/layout/header/header.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { LayoutComponent } from './core/layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatIconModule } from '@angular/material/icon';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';



import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from './shared/delete-confirmation/delete-confirmation.component';
import { CartComponent } from './shared/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    DashboardComponent,
    DeleteConfirmationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSliderModule,
    HttpClientModule,
    MatIconModule,
    FormsModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    ProductModule,
    UserModule,
    CategoryModule

  ],
  providers: [    {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  },HttpService,
  LoggerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
