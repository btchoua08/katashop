import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, delay, map, of, switchMap, switchMapTo, take, tap } from "rxjs";
import { Product } from "../models/product.model";
import { environment } from "src/environments/environment";

@Injectable()

export class ProductsService{

    constructor(private http:HttpClient){

    }
    private productsCheckout: Product[] = [];
    private _loading$ = new BehaviorSubject<boolean>(false);
    get loading$(): Observable<boolean> {
        return this._loading$.asObservable();
      }
    
      private _products$ = new BehaviorSubject<Product[]>([]);
      get products$(): Observable<Product[]> {
        return this._products$.asObservable();
      }

      private _loadingCheckout$ = new BehaviorSubject<boolean>(false);
      get loadingCheckout$(): Observable<boolean> {
          return this._loadingCheckout$.asObservable();
        }

      private _productsCheckout$ = new BehaviorSubject<Product[]>([]);
      get productsCheckout$(): Observable<Product[]> {
        return this._productsCheckout$.asObservable();
      }


      private setLoadingStatus(loading: boolean) {
        this._loading$.next(loading);
      }

      private setLoadingStatusCheckout(loadingcheckout: boolean) {
        this._loadingCheckout$.next(loadingcheckout);
      }

      private lastProductsLoad = 0;

      getProductsFromServer() {
        if (Date.now() - this.lastProductsLoad <= 300000) {
            return;
          }
        this.setLoadingStatus(true);
        this.http.get<Product[]>(`${environment.apiUrl}/products`).pipe(
          delay(1000),
          tap(products => {
            this.lastProductsLoad = Date.now();
            this._products$.next(products);
            this.setLoadingStatus(false);
          })
        ).subscribe();
    }

    getProductById(id: number): Observable<Product> {
        if(!this.lastProductsLoad){
            this.getProductsFromServer();
        }
        return this.products$.pipe(
            map(products => products.filter(product => product.id === id)[0])
        );
    }

    removeProductToCheckout(id: number): void {
        this.setLoadingStatus(true);
        this.productsCheckout$.pipe(
            take(1),
            map(productsCheckouts => productsCheckouts.filter(product => product.id !== id)),
            tap(productsCheckout => {
                this._productsCheckout$.next(productsCheckout);
                this.setLoadingStatus(false);
            })
        ).subscribe();
    }

    addProductToCheckout(id: number): void {
      console.log("valeur de id:",id)
        this.products$.pipe(
            take(1),
            map(productsCheckouts => productsCheckouts.map(product =>{ 
              if(product.id === id){
                 if(!this.elementExists(this.productsCheckout , product)){
                  this.productsCheckout.push(product);
                 }
              }
            })),
            tap(productsCheckout => {
              this._productsCheckout$.next(this.productsCheckout);
              this.setLoadingStatus(false);
          })

           
        ).subscribe();
        
    }

     elementExists(array: Product[], element: Product): boolean {
      return array.some(item => JSON.stringify(item) === JSON.stringify(element));
    }
   
}

