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
  surveys = [];

  constructor(
    private surveyService: SurveyService,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken();
    this.surveyService.getSurveysList().subscribe({
      next: (data) => {
        this.surveys = data.surveys;
        this.hasError = false;
      },
      error: (err) => {
        this.hasError = true;
      },
    });
  }

  editSurvey(id: string): void {
    this.router.navigate(['/edit/' + id]);
  }
  deleteSurvey(id: string): void {
    this.surveyService.deleteSurvey(id).subscribe({
      next: (data) => {
        this.reloadPage();
      },
      error: (err) => {
        this.hasError = true;
      },
    });
  }
  reloadPage(): void {
    window.location.reload();
  }
}
