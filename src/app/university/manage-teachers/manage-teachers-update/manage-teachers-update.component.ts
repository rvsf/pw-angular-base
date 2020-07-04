import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TeacherService } from '../teacher.service';
import { Teacher } from '../teacher.model';

@Component({
  selector: 'app-manage-teachers-update',
  templateUrl: './manage-teachers-update.component.html',
  styleUrls: ['./manage-teachers-update.component.scss']
})
export class ManageTeachersUpdateComponent implements OnInit {
  manageTeachersForm: FormGroup;
  isSaving: boolean;
  constructor(
    protected activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private teacherService: TeacherService,
    private router: Router) { }

  ngOnInit(): void {
    this.createForm();
    this.activatedRoute.data.subscribe(({project}) => {
      this.updateForm(project);
    });
  }

  saveTeacher(): void {
    this.isSaving = true;
    if (!this.manageTeachersForm.get(['id']).value) {
      this.teacherService.create(this.manageTeachersForm.getRawValue()).then(data => {
          this.isSaving = false;
          this.toastr.success('New Teacher successfully created', 'Success');
          this.router.navigate(['/manageteachers']);
        },
        err => {
          this.isSaving = false;
          this.toastr.error('An error occurred while saving a new teacher', 'Error');
        });
    } else {
      this.teacherService.update(this.manageTeachersForm.getRawValue()).then(() => {
          this.isSaving = false;
          this.toastr.success('Teacher successfully updated', 'Success');
          this.router.navigate(['/manageteachers']);
        },
        err => {
          this.isSaving = false;
          this.toastr.error('An error occurred while saving a new teacher', 'Error');
        });
    }
  }

  previousState(): void {
    window.history.back();
  }



  private createForm() {
    this.manageTeachersForm = new FormGroup({
      id: new FormControl(''),
      bday: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      bio: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      email: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      formationYear: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      gender: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      resume: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      workingYear:new FormControl('', [Validators.required, Validators.maxLength(50)]),
      formRecaptcha: new FormControl(null, [Validators.required]),


    });
  }



  private updateForm(teacher: Teacher): void {
    this.manageTeachersForm.patchValue({
      id: teacher.id,
      bday: teacher.bday,
      bio: teacher.bio,
      email: teacher.email,
      formationYear: teacher.formationYear,
      gender: teacher.gender,
      name: teacher.name,
      resume: teacher.resume,
      workingYear:teacher.workingYear

    });
  }
}

