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
import { MatIconModule } from '@angular/material/icon';
import { SalesListComponent } from './components/sales-list/sales-list.component';
import { PersonalMemberComponent } from './components/personal-member/personal-member.component';
import { AccountComponent } from './components/account/account.component';
import { GoodsListComponent } from './components/goods-list/goods-list.component';
import { environment } from '../environments/environment';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { GoodsCategoryPageComponent } from './components/goods-category-page/goods-category-page.component';
import { AddCharPipe } from './pipes/add-char.pipe';
import { CharLimitPipe } from './pipes/char-limit.pipe';
import {MatMenuModule} from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
    GoodsListComponent,
    GoodsCategoryPageComponent,
    AddCharPipe,
    CharLimitPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatMenuModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
