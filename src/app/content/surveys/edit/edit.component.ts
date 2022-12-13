import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SurveyService } from 'src/app/services/survey.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  isSuccessfull = true;
  errorMessage = '';
  _idM = null;
  
  constructor(private fb: FormBuilder,private surveyService: SurveyService, private router: Router, private route: ActivatedRoute) { }

  survey ={
    _id : null,
    content : null,
    description: null,
    surveyType : null,
    title: null,
  };
  
  editFormAgree = this.fb.group({
    _id: this.fb.control('', Validators.required),
    title: this.fb.control('', Validators.required),
    description: this.fb.control('', Validators.required),
    surveyType: this.fb.control('Agree/Disagree', Validators.required),
    agreeContent: this.fb.array([]),
    content: this.fb.array([])
  })
  editFormMulti = this.fb.group({
    _id: this.fb.control('', Validators.required),
    title: this.fb.control('', Validators.required),
    description: this.fb.control('', Validators.required),
    surveyType: this.fb.control('Multiple Choice', Validators.required),
    multiContent: this.fb.array([]),
    content: this.fb.array([])
  })
  editFormShort = this.fb.group({
    _id: this.fb.control('', Validators.required),
    title: this.fb.control('', Validators.required),
    description: this.fb.control('', Validators.required),
    surveyType: this.fb.control('Short Answer', Validators.required),
    shortContent: this.fb.array([]),
    content: this.fb.array([])
  })

 get agreeContent(): FormArray {
    return this.editFormAgree.get('agreeContent') as FormArray;
  }
  get multiContent(): FormArray {
    return this.editFormMulti.get('multiContent') as FormArray;
  }
  get shortContent(): FormArray {
    return this.editFormShort.get('shortContent') as FormArray;
  }


  newQuesAgree(): FormGroup {
    return this.fb.group({
      question: ['', Validators.required],
      options: [['Agree', 'Disagree', 'Neutral'], Validators.required],
    });
  }

  oldQuesAgree(questionIn: any, optionsIn:any ): FormGroup{
    return this.fb.group({
      question: [questionIn, Validators.required],
      options: [optionsIn, Validators.required] 
    })
  }

  newQuesMulti(): FormGroup {
    return this.fb.group({
      question: ['', Validators.required],
      option1: ['', Validators.required],
      option2: ['', Validators.required],
      option3: ['', Validators.required],
      option4: ['', Validators.required],
    });
  }

  oldQuesMulti(quesIn : any, op1In : any , op2In : any, op3In : any, op4In : any): FormGroup {
    return this.fb.group({
      question: [quesIn, Validators.required],
      option1: [op1In, Validators.required],
      option2: [op2In, Validators.required],
      option3: [op3In, Validators.required],
      option4: [op4In, Validators.required],
    });
  }

  newQuesShort(): FormGroup {
    return this.fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required],
    });
  }

  oldQuesShort(quesIn : any, answerIn : any): FormGroup {
    return this.fb.group({
      question: [quesIn, Validators.required],
      answer: [answerIn, Validators.required],
    });
  }
  addQuesAgree() {
    this.agreeContent.push(this.newQuesAgree());
    console.log(this.editFormAgree.value);
  }
  addQuesOldAgree(questionIn: any, optionsIn:any ){
    this.agreeContent.push(this.oldQuesAgree(questionIn,optionsIn))
  }

  addQuesMulti() {
    this.multiContent.push(this.newQuesMulti());
  }
  addQuesOldMulti(quesIn : any, op1In : any , op2In : any, op3In : any, op4In : any) {
    this.multiContent.push(this.oldQuesMulti(quesIn,op1In,op2In,op3In,op4In));
  }

  addQuesShort() {
    this.shortContent.push(this.newQuesShort());
  }
  addQuesOldShort(quesIn : any, answerIn : any) {
    this.shortContent.push(this.oldQuesShort(quesIn, answerIn));
  }
  delQuesAgree(quesIndex: number) {
    this.agreeContent.removeAt(quesIndex);
  }
  delQuesMulti(quesIndex: number) {
    this.multiContent.removeAt(quesIndex);
  }
  delQuesShort(quesIndex: number) {
    this.shortContent.removeAt(quesIndex);
  }
  ngOnInit(): void {
    this.route.params.subscribe({
      next: params => {
        
        this._idM = params['id'];

        this.surveyService.getSurvey(params['id']).subscribe({
          next: (data : any) => {
           
            this.isSuccessfull = true;

            this.survey.surveyType = data.survey.surveyType;
            if(data.survey.surveyType === 'Agree/Disagree'){
              for(let i = 0; i < data.survey.content.length; i++)
              {
                this.addQuesOldAgree(data.survey.content[i].question,data.survey.content[i].options);
              }
              this.editFormAgree.patchValue({ _id: data.survey._id}) 
              this.editFormAgree.patchValue({ title: data.survey.title}) 
              this.editFormAgree.patchValue({ description: data.survey.description}) 
              this.editFormAgree.patchValue({ surveyType: data.survey.surveyType}) 
        
             console.log(this.editFormAgree);
            }
            if(data.survey.surveyType === 'Multiple Choice')
            {
              for(let i = 0; i < data.survey.content.length; i++)
              {
                this.addQuesOldMulti(data.survey.content[i].question,data.survey.content[i].option1,data.survey.content[i].option2,data.survey.content[i].option3,data.survey.content[i].option4);
              }
              this.editFormMulti.patchValue({ _id: data.survey._id}) 
              

            }
            if(data.survey.surveyType === 'Short Answer')
            {
              for(let i = 0; i < data.survey.content.length; i++)
              {
                this.addQuesOldShort(data.survey.content[i].question, data.survey.content[i].answer);
              }
              this.editFormShort.patchValue({ _id: data.survey._id}) 

            }
         
          },
          error: (err : any) => {
            this.isSuccessfull = false;
          },
        });

      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSuccessfull = false;
      }
    })
  }

  onSubmitAgree(){
    //To get the content properly parsed
    this.editFormAgree.value.content = this.editFormAgree.value.agreeContent
    delete this.editFormAgree.value.agreeContent;
    //actual call
    console.log(this.editFormAgree.value);
    this.surveyService.editSurvey(this.editFormAgree.value).subscribe({
        next: data => {
          console.log(data);
          this.isSuccessfull = true;
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.isSuccessfull = false;
        }
      })
  }
  
  onSubmitMulti(){
      //To get the content properly parsed
      this.editFormMulti.value.content = this.editFormMulti.value.multiContent
      delete this.editFormMulti.value.multiContent;
      //actual call
    this.surveyService.editSurvey(this.editFormMulti.value)
      .subscribe({
        next: data => {
          console.log(data);
          this.isSuccessfull = true;
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.isSuccessfull = false;
        }
      })
  }
  onSubmitShort(){
      //To get the content properly parsed
      this.editFormShort.value.content = this.editFormShort.value.shortContent
      delete this.editFormShort.value.shortContent;
      //actual call
    this.surveyService.editSurvey(this.editFormShort.value)
      .subscribe({
        next: data => {
          console.log(data);
          this.isSuccessfull = true;
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.isSuccessfull = false;
        }
      })
  }

}
