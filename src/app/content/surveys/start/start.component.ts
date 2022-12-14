import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyService } from 'src/app/services/survey.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  NgModel
} from '@angular/forms';
import { NonNullAssert } from '@angular/compiler';

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
    agreeSurveyType = false;
    multiSurveyType = false;
    shortSurveyType = false;
    answerArray = [{}];
    questionArray=[];
  
    constructor(
      private surveyService: SurveyService,
      private router: Router,
      private route: ActivatedRoute,
      private tokenStorage: TokenStorageService,
      private fb: FormBuilder,
   
    ) {};


    survey: any = {
        _id: null,
        title: null,
        description: null,
        content: [],
    };

    answerSurvey: any ={
      _id: null,
      completeId: null,
      title: null,
      description: null,
      content:[],
      feedback: null
    };

    

//Get the content of the form from the html
get content(): FormArray {
  return this.survey.get('content') as FormArray;
}


eraseAndReplace(): void{
  this.answerSurvey.content = [];
  this.answerSurvey.completeId = Date.now();
  delete this.answerSurvey.updatedAt;

  for(let i = 0; i < this.answerArray.length; i++)
  {
    this.answerSurvey.content.push({question: this.questionArray[i]['question'], answer: this.answerArray[i]});
  }
  
}
  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorage.getToken();
    this.route.params.subscribe({
      next: params => {

        this.survey._id = params['id'];
        

        this.surveyService.getSurvey(this.survey._id).subscribe({
          next: (data) => {
            this.survey = data.survey;
            this.answerSurvey = data.survey;
            this.questionArray = data.survey.content;
            console.log(this.survey.content[0].option1);
            if (this.survey.surveyType === 'Multiple Choice') {
              this.multiSurveyType = true;
            }
           if(this.survey.surveyType === 'Agree/Disagree'){
              this.agreeSurveyType = true;
           }
           if(this.survey.surveyType === 'Short Answer'){
            this.shortSurveyType = true;
          }
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
    
  this.eraseAndReplace();
    this.surveyService.completeSurvey(this.answerSurvey.value).subscribe({
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