import { Component, OnInit, Input } from '@angular/core';
import { IProject } from 'src/app/project/project.model';
import { IAcademic } from 'src/app/education/academic/academic.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-dialogue',
  templateUrl: './confirm-dialogue.component.html',
  styleUrls: ['./confirm-dialogue.component.scss']
})
export class ConfirmDialogueComponent implements OnInit {
  id : string
  type:string
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  clear(): void {
    this.activeModal.dismiss();
  }
  confirmDelete(id: string): void {
    this.activeModal.close(id);

}
}
