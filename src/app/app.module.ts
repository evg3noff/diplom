import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SliderComponent } from './components/slider/slider.component';
import { PromotionBannerComponent } from './components/promotion-banner/promotion-banner.component';
import { AuthorisationPageComponent } from './components/authorisation-page/authorisation-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { SalesListComponent } from './components/sales-list/sales-list.component';
import { PersonalMemberComponent } from './components/personal-member/personal-member.component';
import { AccountComponent } from './components/account/account.component';
import { GoodsListComponent } from './components/goods-list/goods-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FooterComponent,
    HeaderComponent,
    SliderComponent,
    PromotionBannerComponent,
    AuthorisationPageComponent,
    SalesListComponent,
    PersonalMemberComponent,
    AccountComponent,
    GoodsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
