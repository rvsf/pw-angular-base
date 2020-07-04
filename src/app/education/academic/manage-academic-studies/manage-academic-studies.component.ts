import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AcademicService } from '../academic.service';

import { IAcademic } from '../academic.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmDialogueComponent } from 'src/app/shared/confirm-dialogue/confirm-dialogue.component';

@Component({
  selector: 'app-manage-academic-studies',
  templateUrl: './manage-academic-studies.component.html',
  styleUrls: ['./manage-academic-studies.component.scss']
})
export class ManageAcademicStudiesComponent implements OnInit {
  academics?: IAcademic[] = [];

  constructor(protected modalService: NgbModal, private spinner: NgxSpinnerService,
    private toastr: ToastrService, private  academicService: AcademicService

  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.academicService.getAcademics().subscribe((data: IAcademic[])  => {
      this.spinner.hide();
      this.academics = data;
    }, err => {
      this.spinner.hide();
    });
  }
  trackId(index: number, item: IAcademic): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return Number(item.id);
  }

  delete(academic: IAcademic): void {
    const modalRef = this.modalService.open(ConfirmDialogueComponent, { size: 'lg', backdrop: 'static' });
    console.log(academic)
    modalRef.componentInstance.id = academic.id;
    modalRef.componentInstance.type = 'Academic';
    modalRef.result.then((id)=>{
      if(id)
        this.academicService.deleteAcademic(id).then(() => {
          this.toastr.success('Academic successfully deleted', 'Suceess');
        },
        err => {
          this.toastr.error('An error occurred while deleting project with ID: ' + id , 'Error');
        });
    })
  }
}
