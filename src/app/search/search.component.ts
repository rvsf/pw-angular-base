import { Component, OnInit } from '@angular/core';
import { ICourse } from '../university/manage-courses/course.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { CourseService } from '../university/manage-courses/course.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  courses:ICourse[]=[]
  keyword:string
  keyValue:string
  searchForm:FormGroup;
  constructor( private spinner: NgxSpinnerService,
    private  CourseService: CourseService,
    private toastr: ToastrService,

    protected activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
      this.createSearchForm();
      this.spinner.show();
      this.activatedRoute.data.subscribe(({ courses }) => {
        this.spinner.hide();

        debugger;
        this.courses = courses;
      });
    }
    search():void{
      this.spinner.show();
      if(this.searchForm.invalid){
        this.toastr.error('Please complete key and value','form invalid')
        this.spinner.hide();

        return;
      }
      this.CourseService.getByKeyword(this.searchForm.controls.key.value,this.searchForm.controls.value.value).then(x => {
        this.spinner.hide();
        debugger;
        this.courses = x;
      });

    }
    public createSearchForm() {
      this.searchForm = new FormGroup({
        value: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        key: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        formRecaptcha: new FormControl(null, [Validators.required]),
      });

    }
    trackId(index: number, item: ICourse): number {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      return Number(item.id);
    }

}
