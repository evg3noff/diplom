import { Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Component, inject } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Good } from 'src/app/interfaces/good.interface';
import { getFromLocalStorage, setToLocalStorage } from 'src/app/utils/local-storage';
import { getFromSessionStorage } from 'src/app/utils/session-storage';

@Component({
  selector: 'app-goods-list',
  templateUrl: './goods-list.component.html',
  styleUrls: ['./goods-list.component.scss']
})
export class GoodsListComponent implements OnInit, OnDestroy, OnChanges {
  @Input() collectionName: string | undefined;
  @Input() main: boolean = false;

  @Input() category: string | undefined;

  @Input() likes: boolean = true;

  isAuth: boolean = true;

  goods: Good[] | undefined;

  unsubscribe$: Subject<void> = new Subject<void>();
  private firestore: Firestore = inject(Firestore);

  constructor(
    private _router: Router
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.collectionName) {
      const userProfileCollection = collection(this.firestore, this.collectionName);
      const obs = collectionData(userProfileCollection, { idField: 'id'}) as Observable<Good[]>;

      obs.pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
        if (!this.main) {
          this.goods = res;
        } else {
          this.goods = res.filter((el) => el.oldPrice).splice(0, 10).map(el => ({ ...el, img: `/goods/${el.img}`}));
        }

        if(this.category) {
          this.goods = res.filter((el) => el.category === this.category).map(el => ({ ...el, img: `/goods/${el.img}`}));
        }

        if(this.likes) {
          const storageItems: any = getFromLocalStorage('Like');
          let likeItems = storageItems.items;
          this.goods = res.filter((el) => el.id === likeItems.find(elem => el.id === elem.id)?.id).map(el => ({ ...el, img: `/goods/${el.img}`}));
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit() {
    if(getFromSessionStorage('User')) {
      this.isAuth = true;
    }
  }

  likeClick(item: Good): void {
    if(!this.isAuth) return;
    if(getFromLocalStorage('Like')) {
      const storageItems: any = getFromLocalStorage('Like');
      storageItems.items.push(item);
      setToLocalStorage('Like', storageItems);
    } else {
      const newLikes: any = {
        items: [item]
      }
      setToLocalStorage('Like', newLikes);
    }
  }

  dislikeClick(item: Good) {
    if(!this.isAuth) return;
    const storageItems: any = getFromLocalStorage('Like');
    let likeItems = storageItems.items;
    const indexItem = likeItems.findIndex((el) => el.id === item.id)

    delete likeItems[indexItem]

    const newLikesArr = likeItems.filter((el) => {
      if (el) {
        return true;
      } else {
        return false;
      }
    })

    const newLikes: any = {
      items: newLikesArr
    }

    setToLocalStorage('Like', newLikes);
  }

  checkLike(item: Good): boolean {
    let flag: boolean = false;
    const storageItems: any = getFromLocalStorage('Like');
    if(!storageItems) return flag;
    const ok = storageItems.items.find((el) => el.id === item.id)
    if(ok) flag = true;

    return flag;
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

  getLink(item: Good): string {
    return `/tov-page/${item.id}`
  }
}
