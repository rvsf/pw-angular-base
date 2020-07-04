import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTeachersDetailComponent } from './manage-teachers-detail.component';

describe('ManageTeachersDetailComponent', () => {
  let component: ManageTeachersDetailComponent;
  let fixture: ComponentFixture<ManageTeachersDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageTeachersDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTeachersDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
