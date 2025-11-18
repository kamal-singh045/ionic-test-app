import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonToggle,
  IonSelect,
  IonSelectOption,
  IonIcon,
  AlertController,
  ToastController
} from '@ionic/angular/standalone';
import { AppHeaderComponent } from 'src/app/shared/app-header/app-header.component';
import { addIcons } from 'ionicons';
import {
  moonOutline,
  notificationsOutline,
  cameraOutline,
  trashOutline,
  informationCircleOutline,
  helpCircleOutline,
  documentTextOutline,
  starOutline,
  personOutline,
  lockClosedOutline,
  languageOutline,
  locationOutline,
  logOutOutline
} from 'ionicons/icons';
import { ThemeButtonComponent } from 'src/app/shared/theme-button/theme-button.component';

interface IAppSettings {
  theme: 'light' | 'dark' | 'auto';
  notifications: boolean;
  imageQuality: 'low' | 'medium' | 'high';
  language: string;
  locationTracking: boolean;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonList,
    IonListHeader,
    IonItem,
    IonLabel,
    IonToggle,
    IonSelect,
    IonSelectOption,
    IonIcon,
    CommonModule,
    FormsModule,
    AppHeaderComponent,
    ThemeButtonComponent
  ]
})
export class SettingsPage implements OnInit {
  appVersion = '1.0.0';
  settings: IAppSettings = {
    theme: 'auto',
    notifications: true,
    imageQuality: 'high',
    language: 'en',
    locationTracking: false
  }

  languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'hi', name: 'Hindi' }
  ];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    addIcons({
      'moon-outline': moonOutline,
      'notifications-outline': notificationsOutline,
      'camera-outline': cameraOutline,
      'trash-outline': trashOutline,
      'information-circle-outline': informationCircleOutline,
      'help-circle-outline': helpCircleOutline,
      'document-text-outline': documentTextOutline,
      'star-outline': starOutline,
      'person-outline': personOutline,
      'lock-closed-outline': lockClosedOutline,
      'language-outline': languageOutline,
      'location-outline': locationOutline,
      'log-out-outline': logOutOutline
    })
  }

  ngOnInit() {

  }

  // Load settings from local storage
  loadSettings() {
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      this.settings = JSON.parse(savedSettings);
      this.applyTheme(this.settings.theme);
    }
  }

  // Apply the selected theme
  applyTheme(theme: 'light' | 'dark' | 'auto') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    if (theme === 'auto') {
      document.body.classList.toggle('dark', prefersDark.matches);
    } else {
      document.body.classList.toggle('dark', theme === 'dark');
    }
  }

  // Save settings to local storage
  saveSettings() {
    localStorage.setItem('appSettings', JSON.stringify(this.settings));
    this.showToast('Settings saved successfully...', 'success');
  }

  // Theme selection
  onThemeChange(event: any) {
    this.settings.theme = event.detail.value;
    this.applyTheme(this.settings.theme);
    this.saveSettings();
  }

  // Notification toggle
  onNotificationToggle(event: any) {
    this.settings.notifications = event.detail.checked;
    this.saveSettings();
  }

  // Location toggle
  onLocationToggle(event: any) {
    this.settings.locationTracking = event.detail.checked;
    this.saveSettings();
  }

  // Image quality
  onImageQualityChange(event: any) {
    this.settings.imageQuality = event.detail.value;
    this.saveSettings();
  }

  // Language change
  onLanguageChange(event: any) {
    this.settings.language = event.detail.value;
    this.saveSettings();
    this.showToast('Language changed to ' + event.detail.value, 'success');
  }

  // reset settings
  async resetSettings() {
    const alert = await this.alertController.create({
      header: 'Reset Settings',
      message: 'This will reset all settings to default. Continue?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Reset',
          role: 'destructive',
          handler: () => {
            this.settings = {
              theme: 'auto',
              notifications: true,
              imageQuality: 'high',
              language: 'en',
              locationTracking: false
            };
            this.saveSettings();
            this.applyTheme('auto');
            this.showToast('Settings reset to default', 'success');
          }
        }
      ]
    });
    await alert.present();
  }

  // Clear cache
  async clearCache() {
    const alert = await this.alertController.create({
      header: 'Clear Cache',
      message: 'Are you sure you want to clear the cache?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Clear',
          role: 'destructive',
          handler: () => {
            // Clear cache logic
            localStorage.removeItem('cachedImages');
            this.showToast('Cache cleared successfully', 'success');
          }
        }
      ]
    });

    await alert.present();
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Logout',
          role: 'destructive',
          handler: () => {
            // Clear user data
            localStorage.removeItem('userToken');
            this.showToast('Logged out successfully', 'success');
            // Navigate to login page
          }
        }
      ]
    });
    await alert.present();
  }

  // show toast message
  private async showToast(message: string, color: 'success' | 'error' | 'warning') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color
    });
    await toast.present();
  }
}
