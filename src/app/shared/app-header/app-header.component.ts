import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { menuOutline, arrowBack } from 'ionicons/icons';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
  ]
})
export class AppHeaderComponent implements OnInit {
  @Input() title: string = '';
  @Input() showBackButton?: boolean = false;

  constructor(
    private menuController: MenuController,
    private location: Location
  ) {
    addIcons({
      'menu-outline': menuOutline,
      'arrow-back': arrowBack
    })
  }

  ngOnInit() { }

  openMenu() {
    this.menuController.open('main-menu');
  }

  goBack() {
    this.location.back();
  }
}
