import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup, FormsModule, Validators } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { ThemeButtonComponent } from 'src/app/shared/theme-button/theme-button.component';
import { ThemeInputComponent } from 'src/app/shared/theme-input/theme-input.component';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeButtonComponent,
    ThemeInputComponent
  ]
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  setupErrorMessageClear() {
    this.loginForm.valueChanges.subscribe(() => {
      if (this.errorMessage) {
        this.errorMessage = '';
      }
    })
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    console.log(this.loginForm.value);
    this.isLoading = true;
    this.errorMessage = '';
    const { username, password } = this.loginForm.value;
    this.userService.login(username, password).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/tabs/home']);
      },
      error: (error) => {
        console.error('❌ Login failed:', error);
        this.isLoading = false;
        this.errorMessage = 'Invalid username or password';
      }
    })
  }

  getError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (!field) return '';
    if (field.hasError('required')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }
    if (field.hasError('minlength')) {
      const minLength = field.getError('minlength').requiredLength;
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${minLength} characters`;
    }
    return '';
  }
}
