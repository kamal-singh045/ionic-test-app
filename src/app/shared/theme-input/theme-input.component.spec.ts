import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ThemeInputComponent } from './theme-input.component';

describe('ThemeInputComponent', () => {
  let component: ThemeInputComponent;
  let fixture: ComponentFixture<ThemeInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ThemeInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
