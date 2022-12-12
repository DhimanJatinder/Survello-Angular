import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreeSurveyComponent } from './agree-survey.component';

describe('AgreeSurveyComponent', () => {
  let component: AgreeSurveyComponent;
  let fixture: ComponentFixture<AgreeSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgreeSurveyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgreeSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
