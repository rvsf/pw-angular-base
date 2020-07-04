import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CertificationService } from '../../certification.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Certification } from '../../certification.model';

@Component({
  selector: 'app-manage-certifications-update',
  templateUrl: './manage-certifications-update.component.html',
  styleUrls: ['./manage-certifications-update.component.scss']
})
export class ManageCertificationsUpdateComponent implements OnInit {
  isSaving: boolean;
  manageCertificatesForm: FormGroup;


  constructor(
    protected activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private certificationService: CertificationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.activatedRoute.data.subscribe(({ certification }) => {
      this.updateForm(certification);
    });
  }

  saveCertification(): void {
    this.isSaving = true;

      this.certificationService.createCertification(this.manageCertificatesForm.getRawValue()).then(data => {
          this.isSaving = false;
          this.toastr.success('New Certification successfully created', 'Success');
          this.router.navigate(['/managecertifications']);
        },
        err => {
          this.isSaving = false;
          this.toastr.error('An error occurred while saving a new project', 'Error');
        });

  }
  previousState(): void {
    window.history.back();
  }

  private createForm() {
    this.manageCertificatesForm = new FormGroup({
      id: new FormControl(''),
      certCode: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      certName: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      certUrl: new FormControl('', [Validators.required,  Validators.maxLength(50)]),
      expireDate: new FormControl('', [Validators.required,  Validators.maxLength(50)]),
      expires: new FormControl('', [Validators.required,  Validators.maxLength(50)]),
      issuingDate: new FormControl('', [Validators.required,  Validators.maxLength(50)]),
      issuingOrg: new FormControl('', [Validators.required,  Validators.maxLength(50)]),
    });
  }
  private updateForm(c: Certification): void {
    this.manageCertificatesForm.patchValue({
      id: c.id,
      certCode: c.certCode,
      certName: c.certName,
      certUrl: c.certUrl,
      expireDate: c.expireDate,
      expires: c.expires,
      issuingDate: c.issuingDate,
      issuingOrg: c.issuingOrg,
    });

  }

}
