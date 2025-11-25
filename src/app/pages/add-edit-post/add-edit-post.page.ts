import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import {
  IonContent,
  IonChip,
  IonIcon,
  IonTextarea,
  IonLabel
} from '@ionic/angular/standalone';
import { AppHeaderComponent } from 'src/app/shared/app-header/app-header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post/post.service';
import { IPost } from 'src/app/services/post/types';
import { ThemeInputComponent } from 'src/app/shared/theme-input/theme-input.component';
import { ThemeButtonComponent } from 'src/app/shared/theme-button/theme-button.component';
import { addIcons } from 'ionicons';
import { documentTextOutline, pricetagsOutline, addCircleOutline, closeCircle } from 'ionicons/icons';

@Component({
  selector: 'app-add-edit-post',
  templateUrl: './add-edit-post.page.html',
  styleUrls: ['./add-edit-post.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AppHeaderComponent,
    ThemeInputComponent,
    ThemeButtonComponent,
    IonChip,
    IonIcon,
    IonTextarea,
    IonLabel
  ]
})
export class AddEditPostPage implements OnInit {
  postId: number | null = null;
  isEditMode = false;
  isPostLoading = false;
  isSaving = false;

  postForm: FormGroup;
  currentTag = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private postService: PostService,
    private fb: FormBuilder
  ) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      body: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      tags: [[]]
    });

    addIcons({
      documentTextOutline,
      pricetagsOutline,
      addCircleOutline,
      closeCircle
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log('Query Parameters:', params);
      this.postId = params['id'] ? Number(params['id']) : null;
      this.isEditMode = !!this.postId;

      if (this.isEditMode && this.postId) {
        this.fetchPostById();
      }
    });
  }

  fetchPostById() {
    if (!this.postId) return;
    if (this.isPostLoading) return;
    this.isPostLoading = true;
    this.postService.fetchPostById(this.postId).subscribe({
      next: (response: IPost) => {
        this.postForm.patchValue({
          title: response.title,
          body: response.body,
          tags: response.tags || []
        });
        this.isPostLoading = false;
      },
      error: (error) => {
        console.error('❌ Failed to fetch post:', error);
        this.isPostLoading = false;
      }
    });
  }

  addTag() {
    if (!this.currentTag.trim()) return;

    const tags = this.postForm.get('tags')?.value || [];
    if (!tags.includes(this.currentTag.trim())) {
      this.postForm.patchValue({
        tags: [...tags, this.currentTag.trim()]
      });
    }
    this.currentTag = '';
  }

  removeTag(tagToRemove: string) {
    const tags = this.postForm.get('tags')?.value || [];
    this.postForm.patchValue({
      tags: tags.filter((tag: string) => tag !== tagToRemove)
    });
  }

  onSubmit() {
    if (this.postForm.invalid) {
      Object.keys(this.postForm.controls).forEach(key => {
        this.postForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.isSaving = true;
    const formValue = this.postForm.value;

    // Simulate API call (since the API doesn't support POST/PUT)
    console.log('💾 Saving post:', formValue);

    setTimeout(() => {
      this.isSaving = false;
      console.log('✅ Post saved successfully!');
      this.onCancel();
    }, 1500);
  }

  onCancel() {
    if (this.postId) {
      // just go back
      this.location.back();
    } else {
      this.router.navigate(['/tabs/home']);
    }
  }

  get title() {
    return this.postForm.get('title');
  }

  get body() {
    return this.postForm.get('body');
  }

  get tags() {
    return this.postForm.get('tags')?.value || [];
  }
}
