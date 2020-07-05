import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITeacher } from '../teacher.model';

@Component({
  selector: 'app-manage-teachers-detail',
  templateUrl: './manage-teachers-detail.component.html',
  styleUrls: ['./manage-teachers-detail.component.scss']
})
export class ManageTeachersDetailComponent implements OnInit {
  teacher: ITeacher | null = null;

  constructor(protected activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({teacher}) => {

      this.teacher = teacher;
    });
  }

  previousState(): void {
    window.history.back();
  }

}
