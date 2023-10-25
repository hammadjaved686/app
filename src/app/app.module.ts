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
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardSearchTellerComponent } from './dashboard-search-teller/dashboard-search-teller.component';
import { DashboardMapTellerComponent } from './dashboard-map-teller/dashboard-map-teller.component';
import { DashboardListProgressTellerComponent } from './dashboard-list-progress-teller/dashboard-list-progress-teller.component';
import { DashboardFilesInprogressTellerComponent } from './dashboard-files-inprogress-teller/dashboard-files-inprogress-teller.component';
import { DashboardLarInitiationTellerComponent } from './dashboard-lar-initiation-teller/dashboard-lar-initiation-teller.component';
import { DashboardInitiateReqSearchTellerComponent } from './dashboard-initiate-req-search-teller/dashboard-initiate-req-search-teller.component';
import { DashboardInitiateUploadFileTellerComponent } from './dashboard-initiate-upload-file-teller/dashboard-initiate-upload-file-teller.component';
import { DashboardInitiateRequestTellerComponent } from './dashboard-initiate-request-teller/dashboard-initiate-request-teller.component'; 
@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    DashboardComponent,
    DashboardSearchTellerComponent,
    DashboardMapTellerComponent,
    DashboardListProgressTellerComponent,
    DashboardFilesInprogressTellerComponent,
    DashboardLarInitiationTellerComponent,
    DashboardInitiateReqSearchTellerComponent,
    DashboardInitiateUploadFileTellerComponent,
    DashboardInitiateRequestTellerComponent
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
