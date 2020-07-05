import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITheme } from '../theme.model';

@Component({
  selector: 'app-manage-subject-detail',
  templateUrl: './manage-themes-detail.component.html',
  styleUrls: ['./manage-themes-detail.component.scss']
})
export class ManageThemesDetailComponent implements OnInit {
  Theme: ITheme  | null = null;

  constructor(protected activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ theme }) => {
      this.Theme = theme;
    });
  }
  previousState(): void {
    window.history.back();
  }

}
