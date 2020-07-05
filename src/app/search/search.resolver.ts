import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { ICourse } from '../university/manage-courses/course.model';
import { CourseService } from '../university/manage-courses/course.service';

@Injectable({ providedIn: 'root' })
export class SearchResolver implements Resolve<ICourse[]> {
  constructor(private router: Router, private spinner: NgxSpinnerService, private courseService: CourseService) {}

  resolve(route: ActivatedRouteSnapshot): Promise<ICourse[]> | Promise<never> {
    const id = route.params.id;
    if (id) {
      this.spinner.show();
      return this.courseService.getByKeyword('title',id).then((data: ICourse[]) => {
          this.spinner.hide();
          if (data) {
            return data;
          } else {
            this.router.navigate(['404']);
            return null;
          }
        });
   }
  }
}
