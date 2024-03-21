import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { Observable, switchMap, take, tap } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SingleProductComponent {

  loading$!:   Observable<boolean>;
  product$!: Observable<Product>;
  
  constructor(private productsService:ProductsService,
              private route:ActivatedRoute,
              private router:Router
              ){}
  
  ngOnInit(): void {
      this.initObservables();
  }
  
  private initObservables() {
      this.loading$ = this.productsService.loading$;
      this.product$ = this.route.params.pipe(
        switchMap(params => this.productsService.getProductById(+params['id']))
    );
  }

  onGoBack(){
    this.router.navigateByUrl('/store/products');
  }

 

  onAdd() {
    this.product$.pipe(
        take(1),
        tap(product => {
            this.productsService.addProductToCheckout(product.id);
            this.onGoBack();
        })
    ).subscribe();
}
}

