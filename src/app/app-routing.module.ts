import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { AuthorisationPageComponent } from './components/authorisation-page/authorisation-page.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'auth', component: AuthorisationPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
