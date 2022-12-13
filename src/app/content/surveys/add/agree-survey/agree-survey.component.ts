import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SurveyService } from 'src/app/services/survey.service';

@Component({
  selector: 'app-agree-survey',
  templateUrl: './agree-survey.component.html',
  styleUrls: ['./agree-survey.component.css'],
})
export class AgreeSurveyComponent implements OnInit {
  isSuccessfull = true;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private surveyService: SurveyService,
    private router: Router
  ) {}

  agreeForm = this.fb.group({
    title: this.fb.control('', Validators.required),
    description: this.fb.control('', Validators.required),
    surveyType: this.fb.control('Agree/Disagree', Validators.required),
    content: this.fb.array([]),
  });

  get content(): FormArray {
    return this.agreeForm.get('content') as FormArray;
  }

  addQues() {
    const control = new FormControl(null, Validators.required);
    this.content.push(control);
  }
  delQues(quesIndex: number) {
    this.content.removeAt(quesIndex);
  }
  onSubmit(): void {
    this.surveyService.addSurvey(this.agreeForm.value).subscribe({
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
    // console.log(this.agreeForm.value);
  }

  backToList(): void {
    this.router.navigate(['list']);
  }
  ngOnInit(): void {}
}
