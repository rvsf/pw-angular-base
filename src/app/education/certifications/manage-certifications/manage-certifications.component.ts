import { Component, OnInit } from '@angular/core';
import { ICertification } from '../certification.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CertificationService } from '../certification.service';
import { ConfirmDialogueComponent } from 'src/app/shared/confirm-dialogue/confirm-dialogue.component';

@Component({
  selector: 'app-manage-certifications',
  templateUrl: './manage-certifications.component.html',
  styleUrls: ['./manage-certifications.component.scss']
})
export class ManageCertificationsComponent implements OnInit {
  certifications?: ICertification[] = [];

  constructor(protected modalService: NgbModal, private spinner: NgxSpinnerService,
    private toastr: ToastrService, private  certificationService: CertificationService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.certificationService.getCertifications().subscribe((data: ICertification[])  => {
      this.spinner.hide();
      this.certifications = data;
    }, err => {
      this.spinner.hide();
    });
  }
  trackId(index: number, item: ICertification): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return Number(item.id);
  }
  delete(certificate: ICertification): void {
    const modalRef = this.modalService.open(ConfirmDialogueComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.id = certificate.id;
    modalRef.componentInstance.type = 'Certification';
    modalRef.result.then((id)=>{
      if(id)
        this.certificationService.deleteCertification(id).then(() => {
          this.toastr.success('Certification successfully deleted', 'Suceess');
        },
        err => {
          this.toastr.error('An error occurred while deleting project with ID: ' + id , 'Error');
        });
    })
  }

}
