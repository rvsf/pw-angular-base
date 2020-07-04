import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeacherResolver } from './manage-teachers/teacher.resolver';
import { CourseResolver } from './manage-courses/course.resolver';
import { ManageCoursesComponent } from './manage-courses/manage-courses.component';
import { ManageTeachersComponent } from './manage-teachers/manage-teachers.component';
import { ManageTeachersUpdateComponent } from './manage-teachers/manage-teachers-update/manage-teachers-update.component';
import { ManageTeachersDetailComponent } from './manage-teachers/manage-teachers-detail/manage-teachers-detail.component';
import { ManageCoursesDetailComponent } from './manage-courses/manage-courses-detail/manage-courses-detail.component';
import { ManageThemesComponent } from './manage-themes/manage-themes.component';
import { ThemeResolver } from './manage-themes/theme.resolver';
import { ManageThemesDetailComponent } from './manage-themes/manage-themes-detail/manage-themes-detail.component';
import { ManageThemesUpdateComponent } from './manage-themes/manage-themes-update/manage-themes-update.component';
import { ManageCoursesUpdateComponent } from './manage-courses/manage-courses-update/manage-courses-update.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'managecourses',
        component: ManageCoursesComponent
      },
      {
        path: 'managecourses/:id/view',
        component: ManageCoursesDetailComponent,
        resolve: {
          project: CourseResolver
        }
      },
      {
        path: 'managecourses/new',
        component: ManageCoursesUpdateComponent,
        resolve: {
          project: CourseResolver
        }
      },
      {
        path: 'managecourses/:id/edit',
        component: ManageCoursesUpdateComponent,
        resolve: {
          project: CourseResolver
        }
      },
      {
        path: 'manageteachers',
        component:  ManageTeachersComponent,
        resolve: {
          project: TeacherResolver
        }
      },{
        path: 'manageteachers/:id/view',
        component: ManageTeachersDetailComponent,
        resolve: {
          project: TeacherResolver
        }
      },
      {
        path: 'manageteachers/new',
        component: ManageTeachersUpdateComponent,
        resolve: {
          project: TeacherResolver
        }
      },
      {
        path: 'manageteachers/:id/edit',
        component: ManageTeachersUpdateComponent,
        resolve: {
          project: TeacherResolver
        }
      },
      {
        path: 'managethemes',
        component:  ManageThemesComponent,
        resolve: {
          project: ThemeResolver
        }
      },{
        path: 'managethemes/:id/view',
        component: ManageThemesDetailComponent,
        resolve: {
          project: ThemeResolver
        }
      },
      {
        path: 'managethemes/new',
        component: ManageThemesUpdateComponent,
        resolve: {
          project: ThemeResolver
        }
      },
      {
        path: 'managethemes/:id/edit',
        component: ManageThemesUpdateComponent,
        resolve: {
          project: ThemeResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UniversityRoutingModule { }
