import { Injectable } from "@angular/core";
import { LocalNotifications } from "@capacitor/local-notifications";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor() { }

  // check notification permission
  async checkNotificationPermission(): Promise<boolean> {
    const permission = await LocalNotifications.checkPermissions();
    return permission.display === 'granted';
  }

  // request notification permission
  async requestNotificationPermission(): Promise<boolean> {
    const permission = await LocalNotifications.requestPermissions();
    return permission.display === 'granted';
  }
}
