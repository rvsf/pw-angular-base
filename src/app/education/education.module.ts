import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationRoutingModule } from './education-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ManageAcademicStudiesComponent } from './academic/manage-academic-studies/manage-academic-studies.component';
import { ManageCertificationsComponent } from './certifications/manage-certifications/manage-certifications.component';
import { ManageAcademicStudiesUpdateComponent } from './academic/manage-academic-studies/manage-academic-studies-update/manage-academic-studies-update.component';
import { ManageAcademicStudiesDetailComponent } from './academic/manage-academic-studies/manage-academic-studies-detail/manage-academic-studies-detail.component';
import { ManageCertificationsDetailComponent } from './certifications/manage-certifications/manage-certifications-detail/manage-certifications-detail.component';
import { ManageCertificationsUpdateComponent } from './certifications/manage-certifications/manage-certifications-update/manage-certifications-update.component';




@NgModule({
  declarations: [
    ManageAcademicStudiesComponent,
     ManageCertificationsComponent,
     ManageAcademicStudiesUpdateComponent,
     ManageAcademicStudiesDetailComponent,
     ManageCertificationsDetailComponent,
     ManageCertificationsUpdateComponent,
    ],
  imports: [
    CommonModule,
    SharedModule,
    EducationRoutingModule
  ]
})
export class EducationModule { }
