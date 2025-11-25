import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  IonCard,
  IonCardHeader,
  IonIcon,
  IonCardTitle,
  IonCardContent,
  IonBadge,
  IonButton
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
  standalone: true,
  imports: [
    IonCard,
    IonCardHeader,
    IonIcon,
    IonCardTitle,
    IonCardContent,
    IonBadge,
    IonButton,
    RouterLink
  ]
})
export class PostCardComponent implements OnInit {
  @Input() userId!: number;
  @Input() postId!: number;
  @Input() title!: string;
  @Input() body!: string;
  @Input() tags!: string[];
  @Input() likes: number = 0;
  @Input() dislikes: number = 0;
  @Input() views: number = 0;
  @Input() usernameClickable: boolean = true;

  @Output() goToUserProfileHandler = new EventEmitter<void>();

  constructor(
    private router: Router
  ) { }

  ngOnInit() { }

  goToUserProfile() {
    if (this.usernameClickable) {
      this.goToUserProfileHandler.emit();
    }
  }
}
