import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-goods-category-page',
  templateUrl: './goods-category-page.component.html',
  styleUrls: ['./goods-category-page.component.scss']
})
export class GoodsCategoryPageComponent implements OnInit, OnDestroy {

  category: undefined | string;
  unsubscribe$: Subject<void> = new Subject<void>();

  likes: boolean = false;
  constructor(
    private route: ActivatedRoute
  ) {

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
      if(res["GoodsCategory"] !== `likes`){
        this.category = res["GoodsCategory"]
      } else {
        this.likes = true;
        this.category = res["GoodsCategory"]
      }
    });
  }
}
