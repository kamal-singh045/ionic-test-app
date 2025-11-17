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
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonIcon,
  IonItem
} from '@ionic/angular/standalone';
import { AppHeaderComponent } from 'src/app/shared/app-header/app-header.component';
import { addIcons } from 'ionicons';
import { createOutline, saveOutline, closeOutline } from 'ionicons/icons';

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
    AppHeaderComponent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonIcon,
    IonItem,
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
}
