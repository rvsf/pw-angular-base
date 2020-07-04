import { Component, OnInit } from '@angular/core';
import { ICourse } from './course.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { CourseService } from './course.service';
import { ConfirmDialogueComponent } from 'src/app/shared/confirm-dialogue/confirm-dialogue.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-courses',
  templateUrl: './manage-courses.component.html',
  styleUrls: ['./manage-courses.component.scss']
})
export class ManageCoursesComponent implements OnInit {
  courses?: ICourse[] = [];

  constructor(protected modalService: NgbModal, private spinner: NgxSpinnerService, private  CourseService: CourseService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.CourseService.get().subscribe((data: ICourse[])  => {
      this.spinner.hide();
      this.courses = data;
    }, err => {
      this.spinner.hide();
    });
  }

  trackId(index: number, item: ICourse): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return Number(item.id);
  }

  delete(course: ICourse): void {
    const modalRef = this.modalService.open(ConfirmDialogueComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.id = course.id;
    modalRef.componentInstance.type = 'Course';
    modalRef.result.then((id)=>{
      if(id)
        this.CourseService.delete(id).then(() => {
          this.toastr.success('Course successfully deleted', 'Suceess');
        },
        err => {
          this.toastr.error('An error occurred while deleting course with ID: ' + id , 'Error');
        });
    })
  }
}
