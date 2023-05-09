import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { AuthorisationPageComponent } from './components/authorisation-page/authorisation-page.component';
import { PersonalMemberComponent } from './components/personal-member/personal-member.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'auth', component: AuthorisationPageComponent},
  {path: 'personal-member', component: PersonalMemberComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
