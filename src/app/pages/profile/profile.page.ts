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

interface IUserProfile {
  name: string;
  email: string;
  phone: string;
  designation: string;
}

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
  designations = [
    'Software Developer',
    'Senior Developer',
    'Team Lead',
    'Project Manager',
    'Product Manager',
    'UI/UX Designer',
    'QA Engineer'
  ];
  userData: IUserProfile = {
    name: 'Kamal Singh',
    email: 'kamal@example.com',
    phone: '8888888888',
    designation: 'Software Developer'
  };

  constructor(private fb: FormBuilder) {
    addIcons({
      'create-outline': createOutline,
      'save-outline': saveOutline,
      'close-outline': closeOutline
    })
  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.profileForm = this.fb.group({
      name: [
        { value: this.userData.name, disabled: true },
        [Validators.required, Validators.minLength(3)]
      ],
      email: [
        { value: this.userData.email, disabled: true },
        [Validators.required, Validators.email]
      ],
      phone: [
        { value: this.userData.phone, disabled: true },
        [Validators.required, Validators.pattern(/^\d{10}$/)]
      ],
      designation: [
        { value: this.userData.designation, disabled: true },
        [Validators.required]
      ]
    })
  }

  enableEdit() {
    this.isEditing = true;
    this.profileForm.enable();
  }

  cancelEdit() {
    this.isEditing = false;
    this.profileForm.disable();
    // Reset to the original values
    this.profileForm.patchValue(this.userData);
  }

  saveProfile() {
    if (this.profileForm.valid) {
      const updatedData = this.profileForm.getRawValue();
      console.log('Saving updated values: ', updatedData);

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
