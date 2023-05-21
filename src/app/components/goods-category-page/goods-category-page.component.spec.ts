import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsCategoryPageComponent } from './goods-category-page.component';

describe('GoodsCategoryPageComponent', () => {
  let component: GoodsCategoryPageComponent;
  let fixture: ComponentFixture<GoodsCategoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodsCategoryPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoodsCategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
