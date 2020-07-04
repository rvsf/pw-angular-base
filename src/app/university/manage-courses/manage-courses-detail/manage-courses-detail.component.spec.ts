import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCoursesDetailComponent } from './manage-courses-detail.component';

describe('ManageCoursesDetailComponent', () => {
  let component: ManageCoursesDetailComponent;
  let fixture: ComponentFixture<ManageCoursesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCoursesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCoursesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
