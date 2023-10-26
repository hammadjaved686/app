import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInitiateUploadFileTellerComponent } from './dashboard-initiate-upload-file-teller.component';

describe('DashboardInitiateUploadFileTellerComponent', () => {
  let component: DashboardInitiateUploadFileTellerComponent;
  let fixture: ComponentFixture<DashboardInitiateUploadFileTellerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardInitiateUploadFileTellerComponent]
    });
    fixture = TestBed.createComponent(DashboardInitiateUploadFileTellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
