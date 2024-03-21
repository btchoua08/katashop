import { ChangeDetectionStrategy, Component, ViewChild ,OnInit,OnDestroy,AfterViewInit } from '@angular/core';
import {
  map,
  Observable,
  Subject,
  take,
  tap,
} from 'rxjs';
import { AbstractControl } from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';
import {LiveAnnouncer} from '@angular/cdk/a11y';

@Component({
  selector: 'app-checkout-list',
  templateUrl: './checkout-list.component.html',
  styleUrls: ['./checkout-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CheckoutListComponent implements OnDestroy,OnInit,AfterViewInit{
  private destroy$!: Subject<boolean>;
  loadingCheckout$!: Observable<boolean>;
  productsCheckout$!: Observable<Product[]>;


  displayedColumns: string[] = ['image', 'title', 'price','action'];
  loading = false;
  dataSource: MatTableDataSource<Product> =new MatTableDataSource;
  dataSource$!: Observable<MatTableDataSource<Product>>
  constructor(
    private  productService: ProductsService,
    private _liveAnnouncer: LiveAnnouncer, 
    ) {
     
  }

  ngOnInit(): void {

    this.destroy$ = new Subject<boolean>();
    this.dataSource$=this.productService.productsCheckout$.pipe(
      map(data =>{
        const dataSource = this.dataSource;
        dataSource.data = data;
        return dataSource;
      })
         
    )
   
  }

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }


  ngOnDestroy() {
    this.destroy$.next(true);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  
  getErrorMessage(ctrl: AbstractControl): string {
    if (ctrl.hasError('required')) {
      return 'le champ est oglicatoire';
    }  else {
      return 'Champ  invalide';
    }
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


  removeProduct(id:any){
    this.productService.removeProductToCheckout(id);
  }

  get totalPrice() {
    return this.dataSource.data.map(element => element.price).reduce((acc, curr) => acc + curr, 0);
  }

  openPayPal() {
    const paypalUrl = 'https://www.paypal.com'; 
    window.open(paypalUrl, '_blank');
    
  }
}