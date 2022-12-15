import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SurveyService } from 'src/app/services/survey.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-multi-survey',
  templateUrl: './multi-survey.component.html',
  styleUrls: ['./multi-survey.component.css'],
})
export class MultiSurveyComponent implements OnInit {
  isSuccessfull = true;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private surveyService: SurveyService,
    private router: Router,
    private tokenStorage : TokenStorageService

  ) {}
  user: any = this.tokenStorage.getUser();

  multiForm = this.fb.group({
    title: this.fb.control('', Validators.required),
    description: this.fb.control('', Validators.required),
    surveyType: this.fb.control('Multiple Choice', Validators.required),
    lifeTime: this.fb.control(1,Validators.required),
    content: this.fb.array([]),
    owner: this.user.id
  });

  get content(): FormArray {
    return this.multiForm.get('content') as FormArray;
  }
  newQues(): FormGroup {
    return this.fb.group({
      question: ['', Validators.required],
      option1: ['', Validators.required],
      option2: ['', Validators.required],
      option3: ['', Validators.required],
      option4: ['', Validators.required],
    });
  }

  addQues() {
    this.content.push(this.newQues());
  }
  delQues(quesIndex: number) {
    this.content.removeAt(quesIndex);
  }

  onSubmit(): void {
    
    let x = this.multiForm.value.lifeTime!;
    this.multiForm.value.lifeTime = new Date().setDate(new Date().getDate()+ x);

    this.surveyService.addSurvey(this.multiForm.value).subscribe({
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

    // console.log(this.multiForm.value);
  }

  backToList(): void {
    this.router.navigate(['list']);
  }

  ngOnInit(): void {}
}
