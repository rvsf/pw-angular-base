import { Component, OnInit } from '@angular/core';
import { ICertification } from '../../certification.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-certifications-detail',
  templateUrl: './manage-certifications-detail.component.html',
  styleUrls: ['./manage-certifications-detail.component.scss']
})
export class ManageCertificationsDetailComponent implements OnInit {
  certification: ICertification | null = null;

  constructor(protected activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ academic }) => {
      this.certification = academic;
    });
  }
  previousState(): void {
    window.history.back();
  }

}
