import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCertificationsDetailComponent } from './manage-certifications-detail.component';

describe('ManageCertificationsDetailComponent', () => {
  let component: ManageCertificationsDetailComponent;
  let fixture: ComponentFixture<ManageCertificationsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCertificationsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCertificationsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
