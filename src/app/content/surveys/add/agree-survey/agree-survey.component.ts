import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  selector: 'app-agree-survey',
  templateUrl: './agree-survey.component.html',
  styleUrls: ['./agree-survey.component.css'],
})


export class AgreeSurveyComponent implements OnInit {
  isSuccessfull = true;
  errorMessage = '';
  lifeTimeValue = 0 ;
  @ViewChild('quesBut') myBut!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private surveyService: SurveyService,
    private router: Router,
    private tokenStorage : TokenStorageService
  ) {}
   user: any = this.tokenStorage.getUser();

  agreeForm = this.fb.group({
    title: this.fb.control('', Validators.required),
    description: this.fb.control('', Validators.required),
    surveyType: this.fb.control('Agree/Disagree', Validators.required),
    lifeTime: this.fb.control(1,Validators.required),
    content: this.fb.array([]),
    owner: this.user.id
  });

  
  get content(): FormArray {
    return this.agreeForm.get('content') as FormArray;
  }
  newQues(): FormGroup {
    return this.fb.group({
      question: ['', Validators.required],
      options: [['Agree', 'Disagree', 'Neutral'], Validators.required],
    });
  }
  
  addQues() {
    //const control = new FormControl(null,Validators.required);
    this.content.push(this.newQues());
  }
  delQues(quesIndex: number) {
    this.content.removeAt(quesIndex);
  }
  ngOnInit(): void {
    this.myBut.nativeElement.click();

  }
  onSubmit(): void {
    let x = this.agreeForm.value.lifeTime!;
    this.agreeForm.value.lifeTime = new Date().setDate(new Date().getDate()+ x);

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
  }

  backToList(): void {
    this.router.navigate(['list']);
  }
  
}
/*
window.onload = function(){
  document.getElementById("quesBut")?.click();
}*/