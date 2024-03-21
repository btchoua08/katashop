import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from './store/store.module';

const routes: Routes = [
  {path: 'store',loadChildren:()=>import('./store/store.module').then(m=>StoreModule)},
  {path:'**',redirectTo:'store'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
