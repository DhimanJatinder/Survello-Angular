import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './content/home/home.component';
import { AboutComponent } from './content/about/about.component';
import { LoginComponent } from './content/auth/login/login.component';
import { RegisterComponent } from './content/auth/register/register.component';
import { ListComponent } from './content/surveys/list/list.component';
import { AddComponent } from './content/surveys/add/add.component';
import { AgreeSurveyComponent } from './content/surveys/add/agree-survey/agree-survey.component';
import { MultiSurveyComponent } from './content/surveys/add/multi-survey/multi-survey.component';
import { ShortSurveyComponent } from './content/surveys/add/short-survey/short-survey.component';
import { StartComponent } from './content/surveys/start/start.component';
import { EditComponent } from './content/surveys/edit/edit.component';
import { ModifyComponent } from './content/auth/modify/modify.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'list', component: ListComponent },
  { path: 'add', component: AddComponent },
  { path: 'add/agree-survey', component: AgreeSurveyComponent },
  { path: 'add/multi-survey', component: MultiSurveyComponent },
  { path: 'add/short-survey', component: ShortSurveyComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'start/:id', component: StartComponent },
  { path: 'modify/:id', component: ModifyComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
