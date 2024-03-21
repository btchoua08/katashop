import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { SharedModule }             from '../shared/shared.module';
import { RouterModule }             from '@angular/router';
import {HttpClientModule}           from '@angular/common/http';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
import { ProductsService }          from '../store/services/products.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    SharedModule,
    RouterModule,
    HttpClientModule
  ],
 
  providers:[
    ProductsService
  ]
})
export class CoreModule { }

