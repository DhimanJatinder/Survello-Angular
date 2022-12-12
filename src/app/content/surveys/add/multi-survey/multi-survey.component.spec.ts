import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSurveyComponent } from './multi-survey.component';

describe('MultiSurveyComponent', () => {
  let component: MultiSurveyComponent;
  let fixture: ComponentFixture<MultiSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiSurveyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
