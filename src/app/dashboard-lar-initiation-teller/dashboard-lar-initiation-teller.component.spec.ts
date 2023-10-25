import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLarInitiationTellerComponent } from './dashboard-lar-initiation-teller.component';

describe('DashboardLarInitiationTellerComponent', () => {
  let component: DashboardLarInitiationTellerComponent;
  let fixture: ComponentFixture<DashboardLarInitiationTellerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardLarInitiationTellerComponent]
    });
    fixture = TestBed.createComponent(DashboardLarInitiationTellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
