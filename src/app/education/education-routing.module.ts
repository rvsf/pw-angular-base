import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageAcademicStudiesComponent } from './academic/manage-academic-studies/manage-academic-studies.component';
import { ManageCertificationsComponent } from './certifications/manage-certifications/manage-certifications.component';
import { ManageAcademicStudiesDetailComponent } from './academic/manage-academic-studies/manage-academic-studies-detail/manage-academic-studies-detail.component';
import { Academic } from './academic/academic.model';
import { AcademicResolver } from './academic/academic.resolver';
import { ManageAcademicStudiesUpdateComponent } from './academic/manage-academic-studies/manage-academic-studies-update/manage-academic-studies-update.component';
import { ManageCertificationsDetailComponent } from './certifications/manage-certifications/manage-certifications-detail/manage-certifications-detail.component';
import { CertificationResolver } from './certifications/certification.resolver';
import { ManageCertificationsUpdateComponent } from './certifications/manage-certifications/manage-certifications-update/manage-certifications-update.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'manageacademicstudies',
        component: ManageAcademicStudiesComponent
      },
      {
        path: 'manageacademicstudies/:id/view',
        component: ManageAcademicStudiesDetailComponent,
        resolve: {
          academic: AcademicResolver
        }
      },
      {
        path: 'manageacademicstudies/new',
        component: ManageAcademicStudiesUpdateComponent,
        resolve: {
          academic: AcademicResolver
        }
      },
      {
        path: 'managecertifications',
        component: ManageCertificationsComponent
      },
      {
        path: 'managecertifications/:id/view',
        component: ManageCertificationsDetailComponent,
        resolve: {
          academic: CertificationResolver
        }
      },{
        path: 'managecertifications/new',
        component: ManageCertificationsUpdateComponent,
        resolve: {
          academic: CertificationResolver
        }
      },]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class EducationRoutingModule { }
