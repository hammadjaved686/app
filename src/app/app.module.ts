import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './geo-sol-interceptors/error.interceptor';
import { LoggerService } from './services/logger.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '../app/services/http.service';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout/layout.component'; 
@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
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
