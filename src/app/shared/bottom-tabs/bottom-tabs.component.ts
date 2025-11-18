import { Component, OnInit } from '@angular/core';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, imagesOutline, personOutline, settingsOutline } from 'ionicons/icons';

@Component({
  selector: 'app-bottom-tabs',
  templateUrl: './bottom-tabs.component.html',
  styleUrls: ['./bottom-tabs.component.scss'],
  standalone: true,
  imports: [
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel
  ]
})
export class BottomTabsComponent implements OnInit {

  constructor() {
    addIcons({
      'home-outline': homeOutline,
      'images-outline': imagesOutline,
      'person-outline': personOutline,
      'settings-outline': settingsOutline
    })
  }

  ngOnInit() { }

}
