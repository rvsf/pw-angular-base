import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AcademicService } from '../../academic.service';
import { Academic } from '../../academic.model';

@Component({
  selector: 'app-manage-academic-studies-update',
  templateUrl: './manage-academic-studies-update.component.html',
  styleUrls: ['./manage-academic-studies-update.component.scss']
})
export class ManageAcademicStudiesUpdateComponent implements OnInit {
  manageAcademicsForm: FormGroup;
  isSaving: boolean;
  constructor(
    protected activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private academicService: AcademicService,
    private formBuilder: FormBuilder,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.createForm();
    this.activatedRoute.data.subscribe(({ academic }) => {
      this.updateForm(academic);
    });
  }

  saveAcademic(): void {
    this.isSaving = true;
    if (!this.manageAcademicsForm.get(['id']).value) {
      this.academicService.createAcademic(this.manageAcademicsForm.getRawValue()).then(data => {
          this.isSaving = false;
          this.toastr.success('New Academic successfully created', 'Success');
          this.router.navigate(['/manageacademicstudies']);
        },
        err => {
          this.isSaving = false;
          this.toastr.error('An error occurred while saving a new project', 'Error');
        });
    } else {
      this.academicService.updateAcademic(this.manageAcademicsForm.getRawValue()).then(() => {
          this.isSaving = false;
          this.toastr.success('Academic successfully updated', 'Success');
          this.router.navigate(['/manageacademicstudies']);
        },
        err => {
          this.isSaving = false;
          this.toastr.error('An error occurred while saving a new project', 'Error');
        });
    }
  }

  previousState(): void {
    window.history.back();
  }





  private createForm() {
    this.manageAcademicsForm = new FormGroup({
      id: new FormControl(''),
      educationalInstitution: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      formation: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      fieldOfStudy: new FormControl('', [Validators.required,  Validators.maxLength(50)]),
      startDate: new FormControl('', [Validators.required,  Validators.maxLength(50)]),
      endDate: new FormControl('', [Validators.required,  Validators.maxLength(50)]),
      grade: new FormControl('', [Validators.required,  Validators.maxLength(50)]),
      activities: new FormControl('', [Validators.required,  Validators.maxLength(50)]),
      description: new FormControl('', [Validators.required,  Validators.maxLength(50)]),
    });
  }

  private updateForm(a: Academic): void {
    this.manageAcademicsForm.patchValue({
      id: a.id,
      educationalInstitution: a.educationalInstitution,
      formation: a.formation,
      fieldOfStudy: a.fieldOfStudy,
      startDate: a.startDate,
      endDate: a.endDate,
      grade: a.grade,
      activities: a.activities,
      description: a.description
    });

  }
}
