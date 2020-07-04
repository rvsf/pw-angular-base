import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSubjectsDetailComponent } from './manage-subjects-detail.component';

describe('ManageSubjectsDetailComponent', () => {
  let component: ManageSubjectsDetailComponent;
  let fixture: ComponentFixture<ManageSubjectsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSubjectsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSubjectsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
