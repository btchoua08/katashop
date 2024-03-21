import { ChangeDetectionStrategy, Component ,OnInit,OnDestroy } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderComponent implements OnDestroy,OnInit{

  hidden = false;
  private destroy$!: Subject<boolean>;
  productsCheckout$!: Observable<Product[]>;
  constructor(){

  }

  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
}
