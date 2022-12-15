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
import { TokenStorageService } from 'src/app/services/token-storage.service';

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
    private router: Router,
    private tokenStorage : TokenStorageService
    ) {}
     user: any = this.tokenStorage.getUser();

  shortForm = this.fb.group({
    title: this.fb.control('', Validators.required),
    description: this.fb.control('', Validators.required),
    surveyType: this.fb.control('Short Answer', Validators.required),
    lifeTime: this.fb.control(1,Validators.required),
    content: this.fb.array([]),
    owner: this.user.id
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
    //const control = new FormControl(null, Validators.required);
    this.content.push(this.newQues());
  }
  delQues(quesIndex: number) {
    this.content.removeAt(quesIndex);
  }
  onSubmit(): void {
    let x = this.shortForm.value.lifeTime!;
    this.shortForm.value.lifeTime = new Date().setDate(new Date().getDate()+ x);
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

window.onload = function(){
  document.getElementById("quesBut")?.click();
}