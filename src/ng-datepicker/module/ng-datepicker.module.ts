import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgDatepickerComponent } from '../component/ng-datepicker.component';

@NgModule({
  declarations: [ NgDatepickerComponent ],
  imports: [ CommonModule, FormsModule ],
  exports: [ NgDatepickerComponent, CommonModule, FormsModule ]
})
export class NgDatepickerModule { }
