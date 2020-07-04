import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ThemeService } from '../theme.service';
import { Theme, ITheme } from '../theme.model';
import { CourseService } from '../../manage-courses/course.service';
import { ICourse } from '../../manage-courses/course.model';
import { element } from 'protractor';

@Component({
  selector: 'app-manage-Themes-update',
  templateUrl: './manage-themes-update.component.html',
  styleUrls: ['./manage-themes-update.component.scss']
})
export class ManageThemesUpdateComponent implements OnInit {

  manageThemesForm: FormGroup;
  isSaving: boolean;
  list$: any;
  list: ICourse[];
  course:ICourse;

  constructor(
    protected activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private courseService: CourseService,
    private router: Router) { }

  ngOnInit(): void {
    this.list$=this.courseService.get()
    this.list$.subscribe((courses:ICourse[])=>{
      this.list=courses
    })
    this.createForm();
    this.activatedRoute.data.subscribe(({ project }) => {
      this.updateForm(project);
    });
  }

  saveTheme(): void {
    let theme:ITheme;
    this.isSaving = true;
    if (!this.manageThemesForm.get(['id']).value ) {
      if(!this.course){
        this.toastr.error('Select a course', 'Error');
      return;
      }

      theme =this.manageThemesForm.getRawValue()
      this.course.themes.push(theme)
      this.courseService.update(this.course).then(data => {
          this.isSaving = false;
          this.toastr.success('New Theme successfully created', 'Success');
          this.router.navigate(['/managethemes']);
        },
        err => {
          this.isSaving = false;
          this.toastr.error('An error occurred while saving a new Theme', 'Error');
        });
    } else {
      if(!this.course){
        this.toastr.error('Select a course', 'Error');
        return;
      }
      theme =this.manageThemesForm.getRawValue()
      this.course.themes.forEach(element=>{
        if(element.id===theme.id){
          element.description=theme.description;
          element.maxHours=theme.maxHours;
          element.practice=theme.practice;
          element.title=theme.title;
        }

      })
      this.courseService.update(this.course).then(() => {
          this.isSaving = false;
          this.toastr.success('Theme successfully updated', 'Success');
          this.router.navigate(['/managethemes']);
        },
        err => {
          this.isSaving = false;
          this.toastr.error('An error occurred while saving a new Theme', 'Error');
        });
    }
  }

  previousState(): void {
    window.history.back();
  }
  patchValue(value){
    this.course=value;
  }



  private createForm() {
    this.manageThemesForm = new FormGroup({
      id: new FormControl(''),
      description: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      maxHours: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      practice: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      formRecaptcha: new FormControl(null, [Validators.required]),

    });
  }



  private updateForm(Theme: Theme): void {
    this.manageThemesForm.patchValue({
      id: Theme.id,
      description: Theme.description,
      maxHours: Theme.maxHours,
      practice: Theme.practice,
      title: Theme.title,
    });
  }
}
