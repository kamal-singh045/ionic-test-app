import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  IonContent,
  IonButton
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { AppHeaderComponent } from 'src/app/shared/app-header/app-header.component';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Position } from '@capacitor/geolocation';
import { IUserProfile, UserService } from 'src/app/services/user.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonButton,
    RouterLink,

    AppHeaderComponent
  ],
})
export class HomePage implements OnInit, OnDestroy {
  isLocationFetching: boolean = true;
  locationPosition: Position | null = null;
  isNotificationPermissionGranted = false;
  userData: IUserProfile | null = null;
  apiCallCount: number = 0;

  private destroy$ = new Subject<void>();
  constructor(
    private geolocationService: GeolocationService,
    private notificationService: NotificationService,
    private userService: UserService
  ) { }

  async ngOnInit() {
    this.fetchUserProfile();

    const position = await this.geolocationService.getCurrentLocation();
    this.locationPosition = position;
    this.isLocationFetching = false;
    const notification = await this.notificationService.requestNotificationPermission();
    this.isNotificationPermissionGranted = notification;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  fetchUserProfile() {
    this.userService.fetchUserProfile()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.userData = data;
          this.apiCallCount = this.userService.getApiCallCount();
        },
        error: (error) => {
          console.error(error);
        }
      })
  }
}
