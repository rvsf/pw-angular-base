import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of,  } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { ITheme, Theme } from './theme.model';
import { ThemeService } from './theme.service';
import { CourseService } from '../manage-courses/course.service';
import { ICourse, Course } from '../manage-courses/course.model';

@Injectable({ providedIn: 'root' })
export class ThemeResolver implements Resolve<ITheme> {
  constructor(private router: Router, private spinner: NgxSpinnerService, private courseService: CourseService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITheme> | Observable<never> {
    const id = route.params.id;
    let themeToReturn:ITheme;
    if (id) {
      this.spinner.show();
      return this.courseService.get().pipe(map((data: ICourse[]) => {
        this.spinner.hide();
        if (data) {
          data.forEach((course:Course)=>{
            course.themes.forEach((theme:ITheme)=>{
              if(theme.id===id)
              themeToReturn= theme
            })
          })
            return themeToReturn

        } else {
          this.router.navigate(['404']);
          return null;
        }
      }, err => {
        this.spinner.hide();
      }), take(1));
    }
    return of(new Theme());
  }
}
