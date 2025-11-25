import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
} from '@ionic/angular/standalone';
import { AppHeaderComponent } from 'src/app/shared/app-header/app-header.component';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post/post.service';
import { IPost } from 'src/app/services/post/types';

@Component({
  selector: 'app-add-edit-post',
  templateUrl: './add-edit-post.page.html',
  styleUrls: ['./add-edit-post.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    AppHeaderComponent
  ]
})
export class AddEditPostPage implements OnInit {
  postId!: number;
  isPostLoading = false;
  postData: IPost | null = null;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log('Query Parameters:', params);
      this.postId = params['id'] || null;
    });
    this.fetchPostById();
  }

  fetchPostById() {
    if (this.isPostLoading) return;
    this.isPostLoading = true;
    this.postService.fetchPostById(this.postId).subscribe({
      next: (response) => {
        this.postData = response;
        this.isPostLoading = false;
      },
      error: (error) => {
        console.error('❌ Failed to fetch post:', error);
        this.isPostLoading = false;
      }
    });
  }
}
