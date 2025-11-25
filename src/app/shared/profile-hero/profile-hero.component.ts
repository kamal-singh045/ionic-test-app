import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonIcon, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { locationOutline } from 'ionicons/icons';

@Component({
  selector: 'app-profile-hero',
  templateUrl: './profile-hero.component.html',
  styleUrls: ['./profile-hero.component.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonButton
  ]
})
export class ProfileHeroComponent implements OnInit {
  @Input() firstName!: string;
  @Input() lastName!: string;
  @Input() username!: string;
  @Input() image!: string;
  @Input() isCurrentUser = false;
  @Input() gender!: string;
  @Input() country!: string;

  @Output() editProfileHandler = new EventEmitter<void>();
  @Output() logoutHandler = new EventEmitter<void>();
  constructor() {
    addIcons({
      locationOutline
    })
  }

  ngOnInit() { }

  onEditProfile() {
    this.editProfileHandler.emit();
  }

  onLogout() {
    this.logoutHandler.emit();
  }
}
