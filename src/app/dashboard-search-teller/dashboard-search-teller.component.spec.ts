import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSearchTellerComponent } from './dashboard-search-teller.component';

describe('DashboardSearchTellerComponent', () => {
  let component: DashboardSearchTellerComponent;
  let fixture: ComponentFixture<DashboardSearchTellerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardSearchTellerComponent]
    });
    fixture = TestBed.createComponent(DashboardSearchTellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
