import { HttpClient } from '@angular/common/http';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Good } from 'src/app/interfaces/good.interface';
import { getFromLocalStorage, setToLocalStorage } from 'src/app/utils/local-storage';
import { getFromSessionStorage } from 'src/app/utils/session-storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-story',
  templateUrl: './tov-page.component.html',
  styleUrls: ['./tov-page.component.scss']
})
export class TovPageComponent implements OnInit, OnDestroy {

  unsubscribe$: Subject<void> = new Subject<void>();
  private firestore: Firestore = inject(Firestore);

  collectionName: string = `goods`;

  good: Good;

  goodId: string;

  isAuth: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private _router: Router
  ){
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    if(getFromSessionStorage('User')) {
      this.isAuth = true;
    }
    this.route.params.pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
      this.goodId = res["GoodId"];
      this.getProduct();
    });
  }

  getProduct(): void {
    const userProfileCollection = collection(this.firestore, this.collectionName);
    const obs = collectionData(userProfileCollection, { idField: 'id'}) as Observable<Good[]>;

    obs.pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
      this.good = res.find((el) => el.id === this.goodId);
      console.log(this.good);
    })
  }

  clickBuy(item: Good): void {
    if(!this.isAuth) {
      this._router.navigate(['/auth']);
      return;
    }

    const Cart: any = getFromLocalStorage('Cart');
    if(!Cart) {
      const cartItemsNew = [item];

      setToLocalStorage('Cart', {
        cartItems: cartItemsNew
      });
    } else {
      Cart.cartItems.push(item);

      setToLocalStorage('Cart', Cart);
    }
  }

  clickDeleteFromCart(item: Good): void {
    const storageCart: any = getFromLocalStorage('Cart');

    const newArr = storageCart.cartItems.filter((el) => {
      if(el.id === item.id){
        return false;
      } else {
        return true;
      }
    })

    setToLocalStorage('Cart', {
      cartItems: newArr
    });
  }

  checkGoodOnCart(item: Good): boolean {
    const Cart: any = getFromLocalStorage('Cart');

    if(Cart) {
      const flag = Cart.cartItems.find((el) => el.id === item.id);

      if(flag) return false;
    }

    return true;
  }
}