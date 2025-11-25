import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
} from '@angular/forms';
import {
  IonContent,
  IonIcon,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonSpinner,
} from '@ionic/angular/standalone';
import { AppHeaderComponent } from 'src/app/shared/app-header/app-header.component';
import { addIcons } from 'ionicons';
import {
  locationOutline,
  mailOutline,
  personOutline,
  schoolOutline,
  calendarOutline,
  maleOutline,
  femaleOutline,
  logOutOutline,
  createOutline,
  statsChartOutline
} from 'ionicons/icons';
import { UserService } from 'src/app/services/user/user.service';
import { IUser } from 'src/app/services/user/types';
import { ProfileHeroComponent } from 'src/app/shared/profile-hero/profile-hero.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonIcon,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonSpinner,
    CommonModule,
    ReactiveFormsModule,
    AppHeaderComponent,
    ProfileHeroComponent
  ]
})
export class ProfilePage implements OnInit {
  userData: IUser | null = null;
  isLoading: boolean = false;

  constructor(
    private userService: UserService
  ) {
    addIcons({
      locationOutline,
      mailOutline,
      personOutline,
      schoolOutline,
      calendarOutline,
      maleOutline,
      femaleOutline,
      logOutOutline,
      createOutline,
      statsChartOutline
    })
  }

  ngOnInit() {
    this.fetchUserData();
  }

  fetchUserData() {
    this.isLoading = true;
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        console.log(user);
        this.isLoading = false;
        this.userData = user;
      },
      error: (error) => {
        console.error('❌ Failed to fetch user data:', error);
        this.isLoading = false;
      }
    });
  }

  onLogout() {
    this.userService.logout();
  }

  onEditProfile() {
    // TODO: Navigate to edit profile page
    console.log('Edit profile clicked');
  }
}
