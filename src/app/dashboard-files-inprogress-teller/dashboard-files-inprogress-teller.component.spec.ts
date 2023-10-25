import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFilesInprogressTellerComponent } from './dashboard-files-inprogress-teller.component';

describe('DashboardFilesInprogressTellerComponent', () => {
  let component: DashboardFilesInprogressTellerComponent;
  let fixture: ComponentFixture<DashboardFilesInprogressTellerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardFilesInprogressTellerComponent]
    });
    fixture = TestBed.createComponent(DashboardFilesInprogressTellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
