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
import { MyCustomPipePipe } from './my-custom-pipe.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatIconModule } from '@angular/material/icon';
import { ProductModule } from './product/product.module';
import { MatPaginatorModule } from '@angular/material/paginator';
@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    DashboardComponent,
    MyCustomPipePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSliderModule,
    HttpClientModule,
    MatIconModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    ProductModule

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
