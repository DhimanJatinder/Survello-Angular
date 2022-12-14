import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyService } from 'src/app/services/survey.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent implements OnInit {
    isLoggedIn = false;
    isSuccessfull = true;
    hasError = false;
    errorMessage = '';
    multiSurveyType = false;
    survey:any = {
        _id: null,
        title: null,
        description: null,
        content: []
    };
    id_:any;

    constructor(
      private surveyService: SurveyService,
      private router: Router,
      private route: ActivatedRoute,
      private tokenStorage: TokenStorageService
    ) {}
  
    ngOnInit(): void {
      this.isLoggedIn = !!this.tokenStorage.getToken();
      this.route.params.subscribe({
        next: params => {
          this.survey._id = params['id'];
          console.log("This is: " + params);

          this.surveyService.getSurvey(this.survey._id).subscribe({
            next: (data) => {
              this.survey = data.survey;
              if (this.survey.surveyType === 'Multiple Choice') {
                this.multiSurveyType = true;
              }
              console.log(this.survey);
              this.hasError = false;
            },
            error: (err) => {
              this.hasError = true;
            },
          });
        }
      });
    }
    onSubmit(): void {
      this.surveyService.editSurvey(this.survey).subscribe({
        next: (data) => {
          this.isSuccessfull = true;
          this.backToList();
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.isSuccessfull = false;
        },
      });
    }
    backToList(): void {
      this.router.navigate(['list']);
    }
}