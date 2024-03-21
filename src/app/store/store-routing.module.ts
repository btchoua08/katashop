import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { CheckoutListComponent } from './components/checkout-list/checkout-list.component';

const routes: Routes = [
  {path: 'products', component: ProductListComponent},
  {path: 'products/checkout', component:CheckoutListComponent},
  {path: 'products/:id', component:SingleProductComponent},
  {path: '', pathMatch: 'full',redirectTo:'products'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
