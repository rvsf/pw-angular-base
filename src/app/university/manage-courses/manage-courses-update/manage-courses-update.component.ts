import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, AbstractControl, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from '../course.service';
import { Course } from '../course.model';
import { Observable, observable, Subscription } from 'rxjs';
import { TeacherService } from '../../manage-teachers/teacher.service';
import { ITeacher, Teacher } from '../../manage-teachers/teacher.model';
import { subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-manage-courses-update',
  templateUrl: './manage-courses-update.component.html',
  styleUrls: ['./manage-courses-update.component.scss']
})
export class ManageCoursesUpdateComponent implements OnInit {

  manageCoursesForm: FormGroup;
  isSaving: boolean;
  list$:Observable<any[]>
  list:ITeacher[]=[]
  teacher:ITeacher;
  createTeacher:boolean=false
  manageTeachersForm: FormGroup;
  course:Course ;
  editTeacher:boolean=false



  constructor(
    protected activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private courseService: CourseService,
    private formBuilder: FormBuilder,
    private router: Router,
    private teacherService: TeacherService,
    ) { }

  ngOnInit(): void {
    this.createForm();
     this.activatedRoute.data.subscribe(({ project }) => {
      this.updateForm(project);
      this.course=project
      this.teacher= this.course.teacher
    });
    this.list$=this.teacherService.get()
    this.list$.subscribe((teachers:ITeacher[])=>{
      this.list=teachers

    })

  }

  saveCourse(): void {
    this.isSaving = true;
    this.findTeacher(this.teacher.name)
    if(this.teacher && this.teacher.id)
      this.manageCoursesForm.get(['teacher']).patchValue(this.teacher)
    else{
      this.toastr.error('An error occurred while adding a new teacher', 'Error');

    }
    if(!this.manageCoursesForm.get(['practice']).value)
      this.manageCoursesForm.get(['practice']).patchValue(false)


    if (!this.manageCoursesForm.get(['id']).value) {
      console.log(this.manageCoursesForm.getRawValue())
      this.courseService.create(this.manageCoursesForm.getRawValue()).then(data => {
          this.isSaving = false;
          this.toastr.success('New Course successfully created', 'Success');
          this.router.navigate(['/managecourses']);
        },
        err => {
          console.log(err)
          this.isSaving = false;
          this.toastr.error('An error occurred while saving a new course', 'Error');
        });
    } else {
      this.courseService.update(this.manageCoursesForm.getRawValue()).then(() => {
          this.isSaving = false;
          this.toastr.success('Course successfully updated', 'Success');
          this.router.navigate(['/managecourses']);
        },
        err => {
          this.isSaving = false;
          this.toastr.error('An error occurred while saving a new course', 'Error');
        });
    }
  }
  findTeacher(name: string): any {
    this.list.forEach(element => {
      if(element.name===name)
        this.teacher= element
    });
  }

  patchValue(value){
    this.teacher=value;
    this.manageCoursesForm.get(['teacher']).patchValue(value.name)
  }
  previousState(): void {
    window.history.back();
  }

  addTheme(): void {
    (this.manageCoursesForm.get(['themes']) as FormArray).push(this.createCourseThemeFormGroup());
  }

  deleteCourseTheme(index: number): void {
    (this.manageCoursesForm.get(['themes']) as FormArray).removeAt(index);
  }

  get courseThemesControls(): Array<AbstractControl> {
    return (this.manageCoursesForm.get('themes') as FormArray).controls;
  }

  private createForm() {
    this.manageCoursesForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      ect: new FormControl('', [Validators.required]),
      maxHours: new FormControl('', [Validators.required]),
      practice: new FormControl(false, ),
      teacher: new FormControl('', ),
      teacherID: new FormControl('null', ),
      formRecaptcha: new FormControl(null, [Validators.required]),
      themes: this.formBuilder.array([]),

    });
  }

  private createCourseThemeFormGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl(''),
      description: new FormControl('', [Validators.required]),
      maxHours: new FormControl('', ),
      practice: new FormControl(''),
      themes: new FormControl('', []),
      // teacher: new FormControl('', []),
      title: new FormControl('', [Validators.required]),
    });
  }

  private updateForm(course: Course): void {
    this.manageCoursesForm.patchValue({
      id: course.id,
      description: course.description,
      ect: course.ect,
      maxHours: course.maxHours,
      title: course.title,
      practice: course.practice,
      teacher: course.teacher?course.teacher.name:'N/A',
      themes:course.themes?course.themes:[]
    });
    this.createThemeFormArray(course)
      .forEach(g => (this.manageCoursesForm.get('themes') as FormArray).push(g));
  }

  private createThemeFormArray(course: Course): FormGroup[] {
    const fg: FormGroup[] = [];
    if (!course.themes) {
      course.themes = [];
    }
    course.themes.forEach(courseTheme => {
      fg.push(this.formBuilder.group
        ({
          id: new FormControl(courseTheme.id),
          description: new FormControl(courseTheme.description, [Validators.required, Validators.maxLength(50)]),
          maxHours: new FormControl(courseTheme.maxHours, [Validators.required, Validators.maxLength(50)]),
          title: new FormControl(courseTheme.title, [Validators.required, Validators.maxLength(50)]),
          practice: new FormControl(courseTheme.practice, ),

        })
      );
    });
    return fg;
  }



  public createTeacherForm() {
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
  public editTeacherForm(t:Teacher){
    this.manageTeachersForm = new FormGroup({

    id: new FormControl(t.id,),
    bday: new FormControl(t.bday, [Validators.required, Validators.maxLength(50)]),
    bio: new FormControl(t.bio, [Validators.required, Validators.maxLength(50)]),
    email: new FormControl(t.email, [Validators.required, Validators.maxLength(50)]),
    formationYear: new FormControl(t.formationYear, [Validators.required, Validators.maxLength(50)]),
    gender: new FormControl(t.gender, [Validators.required, Validators.maxLength(50)]),
    name: new FormControl(t.name, [Validators.required, Validators.maxLength(50)]),
    resume: new FormControl(t.resume, [Validators.required, Validators.maxLength(50)]),
    workingYear:new FormControl(t.workingYear, [Validators.required, Validators.maxLength(50)]),
    formRecaptcha: new FormControl(null, [Validators.required]),

    })
  }




  saveTeacher(){
    this.teacherService.create(this.manageTeachersForm.getRawValue()).then(data => {
      this.isSaving = false;
      this.toastr.success('New Teacher successfully created,select it to the course, by writting his name', 'Success');
      this.createTeacher=false
      this.patchValue(this.teacher)
    },
    err => {
      this.isSaving = false;
      this.toastr.error('An error occurred while saving a new teacher', 'Error');
    });
  }
}
