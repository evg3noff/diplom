import { Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Component, inject } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Good } from 'src/app/interfaces/good.interface';

@Component({
  selector: 'app-goods-list',
  templateUrl: './goods-list.component.html',
  styleUrls: ['./goods-list.component.scss']
})
export class GoodsListComponent implements OnInit, OnDestroy, OnChanges {
  @Input() collectionName: string | undefined;
  @Input() main: boolean = false;

  @Input() category: string | undefined;

  goods: Good[] | undefined;

  unsubscribe$: Subject<void> = new Subject<void>();
  private firestore: Firestore = inject(Firestore);

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.collectionName) {
      const userProfileCollection = collection(this.firestore, this.collectionName);
      const obs = collectionData(userProfileCollection) as Observable<Good[]>;

      obs.pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
        if (!this.main) {
          this.goods = res;
        } else {
          this.goods = res.filter((el) => el.oldPrice).splice(0, 10).map(el => ({ ...el, img: `/goods/${el.img}` }));
        }

        if(this.category) {
          this.goods = res.filter((el) => el.category === this.category).map(el => ({ ...el, img: `/goods/${el.img}` }));;
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit() {
    
  }
}
