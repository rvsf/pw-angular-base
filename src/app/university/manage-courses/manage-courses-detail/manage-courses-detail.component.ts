import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICourse } from '../course.model';

@Component({
  selector: 'app-manage-courses-detail',
  templateUrl: './manage-courses-detail.component.html',
  styleUrls: ['./manage-courses-detail.component.scss']
})
export class ManageCoursesDetailComponent implements OnInit {
  course: ICourse | null = null;

  constructor(protected activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ course }) => {
      this.course = course;
    });
  }

  previousState(): void {
    window.history.back();
  }


}
