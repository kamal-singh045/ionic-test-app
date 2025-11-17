import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import {
  homeOutline,
  imagesOutline,
  personOutline,
  settingsOutline
} from 'ionicons/icons';
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonMenuToggle
} from '@ionic/angular/standalone';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItem {
  title: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  standalone: true,
  imports: [
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonMenuToggle, // for automatically toggling the menu when switching the tabs
    RouterLink,
    RouterLinkActive,
  ]
})
export class SideMenuComponent implements OnInit {

  // define the menu items as an array
  menuItems: MenuItem[] = [
    { title: 'Home', url: '/home', icon: 'home-outline' },
    { title: 'Gallery', url: '/gallery', icon: 'images-outline' },
    { title: 'Profile', url: '/profile', icon: 'person-outline' },
    { title: 'Settings', url: '/settings', icon: 'settings-outline' }
  ];

  constructor() {
    // Register icons for use in template
    addIcons({
      'home-outline': homeOutline,
      'images-outline': imagesOutline,
      'person-outline': personOutline,
      'settings-outline': settingsOutline
    })
  }

  ngOnInit() { }
}
