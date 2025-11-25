import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProfileHeroComponent } from './profile-hero.component';

describe('ProfileHeroComponent', () => {
  let component: ProfileHeroComponent;
  let fixture: ComponentFixture<ProfileHeroComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ProfileHeroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
