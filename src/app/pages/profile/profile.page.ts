import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonItem
} from '@ionic/angular/standalone';
import { AppHeaderComponent } from 'src/app/shared/app-header/app-header.component';
import { addIcons } from 'ionicons';
import { createOutline, saveOutline, closeOutline } from 'ionicons/icons';
import { ThemeButtonComponent } from 'src/app/shared/theme-button/theme-button.component';
import { ThemeInputComponent } from 'src/app/shared/theme-input/theme-input.component';
import { IUser, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    ReactiveFormsModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonItem,
    AppHeaderComponent,
    ThemeButtonComponent,
    ThemeInputComponent
  ]
})
export class ProfilePage implements OnInit {
  profileForm!: FormGroup;
  isEditing = false;
  genders = [
    'male',
    'female'
  ];
  userData: IUser | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    addIcons({
      'create-outline': createOutline,
      'save-outline': saveOutline,
      'close-outline': closeOutline
    })
  }

  ngOnInit() {
    this.fetchUserData();
    this.initializeForm();
  }

  initializeForm() {
    this.profileForm = this.fb.group({
      email: [
        { value: this.userData?.email, disabled: true },
        [Validators.required, Validators.email]
      ],
      firstName: [
        { value: this.userData?.firstName, disabled: true },
        [Validators.required, Validators.minLength(3)]
      ],
      lastName: [
        { value: this.userData?.lastName, disabled: true },
        [Validators.required]
      ],
      username: [
        { value: this.userData?.username, disabled: true },
        [Validators.required]
      ],
      gender: [
        { value: this.userData?.gender, disabled: true },
        [Validators.required]
      ]
    })
  }

  fetchUserData() {
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.userData = user;
        this.profileForm.patchValue(user);
      }
    });
  }

  enableEdit() {
    this.isEditing = true;
    this.profileForm.enable();
  }

  cancelEdit() {
    if (!this.userData) {
      return;
    }
    this.isEditing = false;
    this.profileForm.disable();
    // Reset to the original values
    this.profileForm.patchValue(this.userData);
  }

  saveProfile() {
    if (this.profileForm.valid) {
      const updatedData = this.profileForm.getRawValue();
      this.userData = updatedData;
      // Disable editing mode
      this.isEditing = false;
      this.profileForm.disable();
    }
  }

  hasError(fieldName: string, errorType: string): boolean {
    const field = this.profileForm.get(fieldName);
    return !!(field && field.hasError(errorType) && (field.dirty || field.touched));
  }

  allErrors: Record<string, any> = {
    name: {
      required: 'Name is required',
      minlength: 'Name should be at least 3 characters'
    },
    email: {
      required: 'Email is required',
      email: 'Invalid email'
    },
    phone: {
      required: 'Phone number is required',
      pattern: 'Invalid phone number format'
    },
    designation: {
      required: 'Designation is required'
    }
  };

  getError(fieldName: string): string {
    const field = this.profileForm.get(fieldName);
    if (!field) return '';
    const errors = this.allErrors[fieldName];
    for (const errorType in errors) {
      if (field.hasError(errorType)) {
        return errors[errorType];
      }
    }
    return '';
  }
}
