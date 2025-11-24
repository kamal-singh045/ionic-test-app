import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonButton,
  IonSkeletonText,
  IonChip,
  IonIcon,
  IonLabel
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { AppHeaderComponent } from 'src/app/shared/app-header/app-header.component';
import { IPost } from 'src/app/services/post/types';
import { PostService } from 'src/app/services/post/post.service';
import { addIcons } from 'ionicons';
import {
  heartOutline,
  heartDislikeOutline,
  shareSocialOutline,
  chatbubbleOutline,
  heartSharp,
  eyeOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.page.html',
  styleUrls: ['./post-detail.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    IonSkeletonText,
    IonChip,
    IonIcon,
    IonLabel,
    IonButton,
    AppHeaderComponent
  ]
})
export class PostDetailPage implements OnInit {
  id!: number;
  postDetail: IPost | null = null;
  isPostLoading = true;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostService
  ) {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
    });
    addIcons({
      heartOutline,
      heartDislikeOutline,
      shareSocialOutline,
      chatbubbleOutline,
      heartSharp,
      eyeOutline
    })
  }

  ngOnInit() {
    this.fetchPostDetail();
  }

  fetchPostDetail() {
    this.isPostLoading = true;
    this.postsService.fetchPostById(this.id).subscribe({
      next: (response) => {
        this.postDetail = response;
        this.isPostLoading = false;
      },
      error: (error) => {
        console.error('❌ Failed to fetch post:', error);
        this.isPostLoading = false;
      }
    })
  }
}
