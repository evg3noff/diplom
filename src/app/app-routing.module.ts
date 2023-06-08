import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { AuthorisationPageComponent } from './components/authorisation-page/authorisation-page.component';
import { PersonalMemberComponent } from './components/personal-member/personal-member.component';
import { GoodsCategoryPageComponent } from './components/goods-category-page/goods-category-page.component';
import { OrderStoryComponent } from './components/order-story/order-story.component';
import { CartStoryComponent } from './components/cart-story-page/cart-story.component';
import { TovPageComponent } from './components/tov-page/tov-page.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'auth', component: AuthorisationPageComponent},
  {path: 'registration', component: AuthorisationPageComponent},
  {path: 'personal-member', component: PersonalMemberComponent},
  {path: 'goods/:GoodsCategory', component: GoodsCategoryPageComponent},
  {path: 'order-story', component: OrderStoryComponent},
  {path: 'cart-story', component: CartStoryComponent},
  {path: 'tov-page', component: TovPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
