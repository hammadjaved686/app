import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInitiateRequestTellerComponent } from './dashboard-initiate-request-teller.component';

describe('DashboardInitiateRequestTellerComponent', () => {
  let component: DashboardInitiateRequestTellerComponent;
  let fixture: ComponentFixture<DashboardInitiateRequestTellerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardInitiateRequestTellerComponent]
    });
    fixture = TestBed.createComponent(DashboardInitiateRequestTellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
