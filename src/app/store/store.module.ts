import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { SharedModule } from '../shared/shared.module';
import { ProductsService } from './services/products.service';
import { CheckoutListComponent } from './components/checkout-list/checkout-list.component';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [
    ProductListComponent,
    SingleProductComponent,
    CheckoutListComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    SharedModule
  ],
  providers:[
    ProductsService
  ],
  exports:[
    HeaderComponent
  ]
})
export class StoreModule { }
