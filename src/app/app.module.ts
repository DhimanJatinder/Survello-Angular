import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './content/home/home.component';
import { AboutComponent } from './content/about/about.component';
import { LoginComponent } from './content/auth/login/login.component';
import { RegisterComponent } from './content/auth/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProvider } from './_helpers/auth.interceptor';
import { ListComponent } from './content/surveys/list/list.component';
import { AddComponent } from './content/surveys/add/add.component';
import { AgreeSurveyComponent } from './content/surveys/add/agree-survey/agree-survey.component';
import { MultiSurveyComponent } from './content/surveys/add/multi-survey/multi-survey.component';
import { ShortSurveyComponent } from './content/surveys/add/short-survey/short-survey.component';
import { EditComponent } from './content/surveys/edit/edit.component';
import { StartComponent } from './content/surveys/start/start.component';
import { ModifyComponent } from './content/auth/modify/modify.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    ListComponent,
    AddComponent,
    AgreeSurveyComponent,
    MultiSurveyComponent,
    ShortSurveyComponent,
    EditComponent,
    StartComponent,
    ModifyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [authInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
