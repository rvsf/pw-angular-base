import { Component, OnInit } from '@angular/core';
import { IAcademic } from '../../academic.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-academic-studies-detail',
  templateUrl: './manage-academic-studies-detail.component.html',
  styleUrls: ['./manage-academic-studies-detail.component.scss']
})
export class ManageAcademicStudiesDetailComponent implements OnInit {
  academic: IAcademic | null = null;

  constructor(protected activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ academic }) => {
      this.academic = academic;
    });
  }


  previousState(): void {
    window.history.back();
  }

}
