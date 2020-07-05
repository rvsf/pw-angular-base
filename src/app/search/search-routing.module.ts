import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search.component';
import { SearchResolver } from './search.resolver';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':id/view',
        component: SearchComponent,
        resolve: {
          courses: SearchResolver
        }
      }]

  },
];;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
