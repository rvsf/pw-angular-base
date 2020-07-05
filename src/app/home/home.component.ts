import { Component, OnInit } from '@angular/core';
import { CourseService } from '../university/manage-courses/course.service';
import { TeacherService } from '../university/manage-teachers/teacher.service';
import { ICourse } from '../university/manage-courses/course.model';
import { ITeacher } from '../university/manage-teachers/teacher.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  courseList:ICourse[]=[]
  teacherList:ITeacher[]=[]
  constructor(
    private courseService:CourseService,
    private teacherService:TeacherService,
  ) { }

  ngOnInit(): void {
    this.courseService.getByTimeStamp().then(data=>this.courseList=data)
    this.teacherService.getByTimeStamp().then(data=>this.teacherList=data)
  }
  trackIdCourse(index: number, item: ICourse): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return Number(item.id);
  }
  trackIdTeacher(index: number, item: ITeacher): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return Number(item.id);
  }
}
