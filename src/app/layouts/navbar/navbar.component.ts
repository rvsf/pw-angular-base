import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  navBarSearchForm: FormGroup;

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    this.navBarSearchForm = new FormGroup({
      searchKey: new FormControl(''),
    });
  }
  search(){
    if(this.navBarSearchForm.controls.searchKey.value)
    this.router.navigate(['/search',this.navBarSearchForm.controls.searchKey.value,'view']);

  }
}
