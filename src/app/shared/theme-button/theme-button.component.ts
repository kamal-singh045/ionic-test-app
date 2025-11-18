import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  IonButton,
  IonIcon,
  IonSpinner
} from '@ionic/angular/standalone';
import { NgClass } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'gradient';

@Component({
  selector: 'app-theme-button',
  templateUrl: './theme-button.component.html',
  styleUrls: ['./theme-button.component.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonIcon,
    IonSpinner,
    NgClass
  ]
})
export class ThemeButtonComponent implements OnInit {
  @Input() title: string = '';
  @Input() variant: ButtonVariant = 'primary';
  @Input() disabled?: boolean = false;
  @Input() iconStart?: string;
  @Input() iconEnd?: string;
  @Input() loading?: boolean = false;
  @Input() type?: 'submit' | 'reset' | 'button' = 'button';
  @Input() expand?: 'block' | 'full' = 'block';
  @Input() fill?: 'clear' | 'outline' | 'solid' = 'solid';
  @Input() size?: 'small' | 'default' | 'large';

  // use EventEmitter for output events
  @Output() handler = new EventEmitter<void>();

  constructor() { }

  ngOnInit() { }

  handleClick() {
    if (!this.loading && !this.disabled) {
      this.handler.emit();
    }
  }

  get buttonClass(): string {
    return `btn-${this.variant}`;
  }
}
