import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const SURVEY_API = environment.apiUrl + '/surveys/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  constructor(private httpClient: HttpClient) {}

  //get list of surveys
  getSurveysList(): Observable<any> {
    return this.httpClient.get(SURVEY_API + 'list', httpOptions);
  }

  //get one survey
  getSurvey(id: String): Observable<any> {
    return this.httpClient.get(SURVEY_API + id, httpOptions);
  }
  //add a survey
  addSurvey(survey: any): Observable<any> {
    console.log(survey);
    return this.httpClient.post(SURVEY_API + 'add', survey, httpOptions);
  }
  //edit a survey
  editSurvey(survey: any): Observable<any> {
    return this.httpClient.put(
      SURVEY_API + 'edit/' + survey['_id'],
      survey,
      httpOptions
    );
  }
  startSurvey(survey: any): Observable<any> {
    return this.httpClient.put(SURVEY_API + 'start/' + survey['_id'], survey, httpOptions);
  }
  //FOR SUBMIT SURVEY
  completeSurvey(survey : Object): Observable<any>{
    console.log(survey);
    return this.httpClient.post(SURVEY_API + 'complete', survey,httpOptions)
  }
  //delete as survey
  deleteSurvey(id: string): Observable<any> {
    return this.httpClient.delete(SURVEY_API + 'delete/' + id, httpOptions);
  }
}
