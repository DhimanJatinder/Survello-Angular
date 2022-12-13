import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SurveyService } from 'src/app/services/survey.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  isSuccessfull = true;
  errorMessage = '';
  multiSurveyType = false;

  constructor(
    private surveyService: SurveyService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  survey: any = {
    _id: null,
    title: null,
    description: null,
    surveyType: null,
    content: null,
  };

  get content(): FormArray {
    return this.survey.get('content') as FormArray;
  }

  trackByFn(index: number, obj: any): any {
    return index;
  }

  backToList(): void {
    this.router.navigate(['list']);
  }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        this.survey._id = params['id'];

        this.surveyService.getSurvey(this.survey._id).subscribe({
          next: (data) => {
            //console.log(data);

            this.survey = data.survey;
            if (this.survey.surveyType === 'Multiple Choice') {
              this.multiSurveyType = true;
            }

            console.log(this.survey);
          },
          error: (err) => {
            this.errorMessage = err.error.message;
            this.isSuccessfull = false;
          },
        });
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isSuccessfull = false;
      },
    });
  }
  onSubmit(): void {
    this.surveyService.editSurvey(this.survey).subscribe({
      next: (data) => {
        //console.log(data);
        this.isSuccessfull = true;
        this.backToList();
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isSuccessfull = false;
      },
    });

    console.log(this.survey);
  }
}
