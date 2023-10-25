import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInitiateReqSearchTellerComponent } from './dashboard-initiate-req-search-teller.component';

describe('DashboardInitiateReqSearchTellerComponent', () => {
  let component: DashboardInitiateReqSearchTellerComponent;
  let fixture: ComponentFixture<DashboardInitiateReqSearchTellerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardInitiateReqSearchTellerComponent]
    });
    fixture = TestBed.createComponent(DashboardInitiateReqSearchTellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
