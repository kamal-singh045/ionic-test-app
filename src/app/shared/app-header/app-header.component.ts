import { Component, Input, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { menuOutline } from 'ionicons/icons';

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
    IonMenuButton
  ]
})
export class AppHeaderComponent implements OnInit {
  @Input() title: string = '';
  constructor(
    private menuController: MenuController
  ) {
    addIcons({
      'menu-outline': menuOutline
    })
  }

  ngOnInit() { }

  openMenu() {
    this.menuController.open('main-menu');
  }
}
