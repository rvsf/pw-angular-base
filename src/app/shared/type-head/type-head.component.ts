import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-type-head',
  templateUrl: './type-head.component.html',
  styleUrls: ['./type-head.component.scss']
})
export class TypeHeadComponent implements OnInit {



  @Input() type:string
  @Input() list: any[]
  @Input() currentValue:any
  @Output()value: EventEmitter<String> = new EventEmitter<string>();
  public model: any ;

  formatter = (state: any) => state.name||state.title;
  ngOnInit(): void {
    if(this.currentValue)
      this.model= this.currentValue
  }
  search = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter(term => term.length >= 2),
    map(term => this.list.filter(state => new RegExp(term, 'mi').test(state.name?state.name:state.title)).slice(0, 10))

  )


}
