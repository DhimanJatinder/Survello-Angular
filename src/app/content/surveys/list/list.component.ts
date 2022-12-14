import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SurveyService } from 'src/app/services/survey.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  isLoggedIn = false;
  hasError = false;
  stillOpen = false;
  isNotOwner = true;

  surveys: any = {
    _id: null,
    title: null,
    description: null,
    surveyType: null,
    lifeTime: null,
    content: null,
    owner: null,
    stillOpen: null,
    ownerStatus: null,
  };

  constructor(
    private surveyService: SurveyService,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken();
    this.surveyService.getSurveysList().subscribe({
      next: (data: any) => {
        this.surveys = data.surveys;
        const user: any = this.tokenStorage.getUser();

        for (let i = 0; i < this.surveys.length; i++) {
          if (user.id === this.surveys[i].owner) {
            this.surveys[i].ownerStatus = true;
            //console.log(this.surveys[i].ownerStatus);
          }
          console.log(this.surveys[i].ownerStatus);

          let number = parseInt(data.surveys[i].lifeTime);
          this.surveys[i].lifeTime = new Date(number);
          //console.log(this.surveys[i].lifeTime < new Date());
          if (this.surveys[i].lifeTime < new Date()) {
            this.surveys[i].stillOpen = false;
            this.stillOpen = false;
          } else {
            this.surveys[i].stillOpen = true;
            this.stillOpen = true;
          }
        }

        this.hasError = false;
      },
      error: (err: any) => {
        this.hasError = true;
      },
    });
  }

  editSurvey(id: string): void {
    this.router.navigate(['/edit/' + id]);
  }
  deleteSurvey(id: string): void {
    this.surveyService.deleteSurvey(id).subscribe({
      next: (data: any) => {
        this.reloadPage();
      },
      error: (err: any) => {
        this.hasError = true;
      },
    });
  }
  startSurvey(id: string): void {
    this.router.navigate(['/start/' + id]);
  }
  reloadPage(): void {
    window.location.reload();
  }
}
