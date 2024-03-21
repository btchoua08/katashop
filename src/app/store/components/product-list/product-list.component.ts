import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';
import { FormBuilder, FormControl } from '@angular/forms';
import { ProductSearchType } from '../../enums/product-search-type.enum';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit{

  loading$!: Observable<boolean>;
  products$!: Observable<Product[]>;

  searchCtrl!: FormControl;
  searchTypeCtrl!: FormControl;
  searchTypeOptions!: {
    value: ProductSearchType,
    label: string
}[];

  constructor(private productsService:ProductsService,private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.initForm();
    this.initObservables();
    this.productsService.getProductsFromServer();
}

private initObservables() {
    this.loading$ = this.productsService.loading$;
    const search$ = this.searchCtrl.valueChanges.pipe(
      startWith(this.searchCtrl.value),
      map(value => value.toLowerCase())
    );
    const searchType$: Observable<ProductSearchType> = this.searchTypeCtrl.valueChanges.pipe(
      startWith(this.searchTypeCtrl.value)
    );
    this.products$ = combineLatest([
      search$,
      searchType$,
      this.productsService.products$
      ]).pipe(
        map(([search, searchType, products]) => products.filter(product => product[searchType]
          .toLowerCase()
          .includes(search as string))
      )
      );
}

private initForm() {
  this.searchCtrl = this.formBuilder.control('');
  this.searchTypeCtrl = this.formBuilder.control(ProductSearchType.TITLE);
  this.searchTypeOptions = [
      { value: ProductSearchType.TITLE, label: 'title' },
      { value: ProductSearchType.DESCRIPTION, label: 'description' },
      { value: ProductSearchType.CATEGORY, label: 'category' }
  ];
}
}
