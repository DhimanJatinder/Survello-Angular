import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SurveyService } from 'src/app/services/survey.service';

@Component({
  selector: 'app-short-survey',
  templateUrl: './short-survey.component.html',
  styleUrls: ['./short-survey.component.css'],
})
export class ShortSurveyComponent implements OnInit {
  isSuccessfull = true;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private surveyService: SurveyService,
    private router: Router
  ) {}

  shortForm = this.fb.group({
    title: this.fb.control('', Validators.required),
    description: this.fb.control('', Validators.required),
    surveyType: this.fb.control('Short Answer', Validators.required),
    content: this.fb.array([]),
  });

  get content(): FormArray {
    return this.shortForm.get('content') as FormArray;
  }
  newQues(): FormGroup {
    return this.fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required],
    });
  }
  addQues() {
    this.content.push(this.newQues());
  }
  delQues(quesIndex: number) {
    this.content.removeAt(quesIndex);
  }
  onSubmit(): void {
    this.surveyService.addSurvey(this.shortForm.value).subscribe({
      next: (data) => {
        console.log(data);
        this.isSuccessfull = true;
        this.backToList();
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isSuccessfull = false;
      },
    });

    //console.log(this.shortForm.value);
  }

  backToList(): void {
    this.router.navigate(['list']);
  }
  ngOnInit(): void {}
}
