import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UniversityRoutingModule } from './university-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManageTeachersComponent } from './manage-teachers/manage-teachers.component';
import { ManageCoursesComponent } from './manage-courses/manage-courses.component';

import { ManageTeachersDetailComponent } from './manage-teachers/manage-teachers-detail/manage-teachers-detail.component';
import { ManageTeachersUpdateComponent } from './manage-teachers/manage-teachers-update/manage-teachers-update.component';
import { ManageCoursesUpdateComponent } from './manage-courses/manage-courses-update/manage-courses-update.component';

import { ManageCoursesDetailComponent } from './manage-courses/manage-courses-detail/manage-courses-detail.component';
import { ManageThemesComponent } from './manage-themes/manage-themes.component';
import { ManageThemesDetailComponent } from './manage-themes/manage-themes-detail/manage-themes-detail.component';
import { ManageThemesUpdateComponent } from './manage-themes/manage-themes-update/manage-themes-update.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    ManageTeachersComponent,
    ManageTeachersUpdateComponent,
    ManageTeachersDetailComponent,
    ManageCoursesComponent,
    ManageCoursesDetailComponent,
    ManageCoursesUpdateComponent,
    ManageThemesComponent,
    ManageThemesDetailComponent,
    ManageThemesUpdateComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UniversityRoutingModule,
    NgbModule
  ],
  exports:[
    ManageTeachersUpdateComponent

  ]
})
export class UniversityModule { }
