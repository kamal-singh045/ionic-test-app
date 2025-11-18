import { Component } from '@angular/core';
import {
  IonContent,
  IonButton
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { AppHeaderComponent } from 'src/app/shared/app-header/app-header.component';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Position } from '@capacitor/geolocation';

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
export class HomePage {
  isLocationFetching: boolean = true;
  locationPosition: Position | null = null;
  isNotificationPermissionGranted = false;
  constructor(
    private geolocationService: GeolocationService,
    private notificationService: NotificationService
  ) { }

  async ngOnInit() {
    const position = await this.geolocationService.getCurrentLocation();
    this.locationPosition = position;
    this.isLocationFetching = false;
    const notification = await this.notificationService.requestNotificationPermission();
    this.isNotificationPermissionGranted = notification;
  }
}
