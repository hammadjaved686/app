import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMapTellerComponent } from './dashboard-map-teller.component';

describe('DashboardMapTellerComponent', () => {
  let component: DashboardMapTellerComponent;
  let fixture: ComponentFixture<DashboardMapTellerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardMapTellerComponent]
    });
    fixture = TestBed.createComponent(DashboardMapTellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
