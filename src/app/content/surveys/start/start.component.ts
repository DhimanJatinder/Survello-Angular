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
    agreeArray = [{}];


    survey:any = {
        _id: null,
        title: null,
        description: null,
        content: []
    };

  
    constructor(
      private surveyService: SurveyService,
      private router: Router,
      private route: ActivatedRoute,
      private tokenStorage: TokenStorageService,
      private fb: FormBuilder,
   
    ) {}

    shortFormComplete = this.fb.group({
      title: this.fb.control('', Validators.required),
      description: this.fb.control('', Validators.required),
      surveyType: this.fb.control('Short Answer', Validators.required),
      content: this.fb.array([]),
    });

    multiFormComp = this.fb.group({
      title: this.fb.control('', Validators.required),
      description: this.fb.control('', Validators.required),
      surveyType: this.fb.control('Multiple Choice', Validators.required),
      content: this.fb.array([]),
    });
    agreeFormComplete = this.fb.group({
      title: this.fb.control('', Validators.required),
      description: this.fb.control('', Validators.required),
      surveyType: this.fb.control('Agree/Disagree', Validators.required),
      content: this.fb.array([]),
    });

//Get the content of the form from the html
  get content(): FormArray {
    return this.survey.get('content') as FormArray;
  }
  //Push the answers to the content
 
  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorage.getToken();
    this.route.params.subscribe({
      next: params => {

        this.survey._id = params['id'];


        this.surveyService.getSurvey(this.survey._id).subscribe({
          next: (data) => {
            this.survey = data.survey;
            console.log(data.survey);
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
    console.log(this.agreeFormComplete.value);

    /*this.surveyService.completeSurvey(this.survey.value).subscribe({
      next: (data) => {
        this.isSuccessfull = true;
        this.backToList();
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isSuccessfull = false;
      },
    });*/
  }
  backToList(): void {
    this.router.navigate(['list']);
  }
}