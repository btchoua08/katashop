import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
import { MaterialModule }       from './material.module';
import { ShrotenPipe }          from './pipes/shroten.pipe';
import { TimeAgoPipe }          from './pipes/time-ago.pipe';
import { ReactiveFormsModule }  from '@angular/forms';
import { FlexLayoutModule }     from "@angular/flex-layout";


@NgModule({
  declarations: [
    ShrotenPipe,
    TimeAgoPipe,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  exports:[
   MaterialModule,
   ShrotenPipe,
   TimeAgoPipe,
   ReactiveFormsModule,
   FlexLayoutModule
  ]
})
export class SharedModule { }
