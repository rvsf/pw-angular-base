import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmDialogueComponent } from 'src/app/shared/confirm-dialogue/confirm-dialogue.component';
import { ITheme } from './theme.model';
import { ThemeService } from './theme.service';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from '../manage-courses/course.service';
import { ICourse, Course } from '../manage-courses/course.model';

@Component({
  selector: 'app-manage-Themes',
  templateUrl: './manage-themes.component.html',
  styleUrls: ['./manage-themes.component.scss']
})
export class ManageThemesComponent implements OnInit {

  Themes?: ITheme[] = [];
  listCourses: ICourse[]= []
  create:boolean=false;
  constructor(protected modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private  courseService: CourseService,
    private toastr: ToastrService

    ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.courseService.get().subscribe((data: ICourse[])  => {
      this.spinner.hide();

      this.Themes = this.mapData(data);
      if(data.length>0)
        this.create=true;

    }, err => {
      this.spinner.hide();
    });
  }
  mapData(data: ICourse[]): ITheme[] {
  this.listCourses=data;
    const list : ITheme[] = []
    data.forEach(element => {
      element.themes.forEach(theme=>{
        list.push(theme)
      })
    });
    return list

  }

  trackId(index: number, item: ITheme): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return Number(item.id);
  }

  delete(Theme: ITheme): void {
    const modalRef = this.modalService.open(ConfirmDialogueComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.id = Theme.id;
    modalRef.componentInstance.type = 'Theme';
    debugger;

    modalRef.result.then((id)=>{

      if(id){
          let course : Course
          let flagToRemove:boolean=false;
          let idCourse:string = null;
          let indexTheme:number = null;
          let indexCourse:number = null;

          this.listCourses.forEach((element,index) => {
              element.themes.forEach((theme,i)=>{
                if(theme.id===id){
                  indexTheme=i;
                  element.themes.slice()
                  flagToRemove=true
                }
              })
              if(flagToRemove&&!indexCourse){//just hold the first
                indexCourse=index;


              }
          });
          if(flagToRemove ){
            course=this.listCourses[indexCourse]
            course.themes.splice(indexTheme,1)
          }
          console.log(course)
        this.courseService.update(course).then(() => {
          this.toastr.success('Certification successfully deleted', 'Suceess');
        },
        err => {
          this.toastr.error('An error occurred while deleting project with ID: ' + id , 'Error');
        });
      }


    })
  }
}
