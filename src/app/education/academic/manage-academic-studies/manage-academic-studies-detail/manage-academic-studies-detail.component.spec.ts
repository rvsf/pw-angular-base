import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAcademicStudiesDetailComponent } from './manage-academic-studies-detail.component';

describe('ManageAcademicStudiesDetailComponent', () => {
  let component: ManageAcademicStudiesDetailComponent;
  let fixture: ComponentFixture<ManageAcademicStudiesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAcademicStudiesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAcademicStudiesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
