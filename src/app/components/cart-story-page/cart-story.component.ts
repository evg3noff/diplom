import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil, zip } from 'rxjs';
import { Good } from 'src/app/interfaces/good.interface';
import { getFromLocalStorage, removeFromLocalStorage } from 'src/app/utils/local-storage';
import { getFromSessionStorage } from 'src/app/utils/session-storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-story',
  templateUrl: './cart-story.component.html',
  styleUrls: ['./cart-story.component.scss']
})
export class CartStoryComponent implements OnInit, OnDestroy {

  goods: Good[];

  finalPrice: number;

  user: any;

  unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private _http: HttpClient,
    private router: Router,
  ){
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.user = getFromSessionStorage('User');
    const Cart: any = getFromLocalStorage('Cart');
    this.goods = Cart.cartItems;

    this.finalPrice = this.goods.reduce((acc, el, index) => {
      return el.mainPrice + acc;
    }, 0)
  }

  sendOrder(): void {
    this._http.post((environment.apiUrl + 'order/get'), {
      name: this.user.name,
      email: this.user.email
    }).pipe(takeUntil(this.unsubscribe$))
    .subscribe((res: any) => {
      this.foldGoodsToPost(res.values.value)
    })
  }

  foldGoodsToPost(orderId: number): void {
    const observablesArr = [];
    this.goods.forEach((el) => {
      observablesArr.push(
        this._http.post(environment.apiUrl + 'order/add-product', {
          orderId: orderId,
          productId: el.id
        })
      )
    })
    const zipObs = zip(observablesArr)

    zipObs.pipe(takeUntil(this.unsubscribe$))
    .subscribe(res => {
      this.finishOrderReq(orderId);
    })
  }

  finishOrderReq(orderId: number): void { 
    this._http.post(environment.apiUrl + 'order/finish-order', {
      name: this.user.name,
      email: this.user.email,
      orderId: orderId,
    }).pipe(takeUntil(this.unsubscribe$))
    .subscribe((res)=> {
      removeFromLocalStorage('Cart');
      this.router.navigate(['/']);
    })
  }

}