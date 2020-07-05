import { Component, OnInit } from '@angular/core';
import { ConfirmDialogueComponent } from 'src/app/shared/confirm-dialogue/confirm-dialogue.component';
import { ITeacher } from './teacher.model';
import { TeacherService } from './teacher.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from '../manage-courses/course.service';

@Component({
  selector: 'app-manage-teachers',
  templateUrl: './manage-teachers.component.html',
  styleUrls: ['./manage-teachers.component.scss']
})
export class ManageTeachersComponent implements OnInit {
  teachers?: ITeacher[] = [];
  create:boolean=false;

  constructor(protected modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private  teacherService: TeacherService,

    private toastr: ToastrService


    ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.teacherService.get().subscribe((data: ITeacher[])  => {
      this.teachers=data
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });

  }

  trackId(index: number, item: ITeacher): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return Number(item.id);
  }

  delete(teacher: ITeacher): void {
    const modalRef = this.modalService.open(ConfirmDialogueComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.id = teacher.id;
    modalRef.componentInstance.type = 'Teacher';
    modalRef.result.then((id)=>{
      if(id)
        this.teacherService.delete(id).then(() => {
          this.toastr.success('Certification successfully deleted', 'Suceess');
        },
        err => {
          this.toastr.error('An error occurred while deleting project with ID: ' + id , 'Error');
        });
    })
  }

}
