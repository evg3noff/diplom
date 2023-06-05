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
      this.category = res["GoodsCategory"];
      console.log(this.category);
    });
  }
}
