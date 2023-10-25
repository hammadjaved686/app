import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardListProgressTellerComponent } from './dashboard-list-progress-teller.component';

describe('DashboardListProgressTellerComponent', () => {
  let component: DashboardListProgressTellerComponent;
  let fixture: ComponentFixture<DashboardListProgressTellerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardListProgressTellerComponent]
    });
    fixture = TestBed.createComponent(DashboardListProgressTellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
