import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonButton,
  IonSkeletonText,
  IonChip,
  IonIcon,
  IonLabel,
  IonAvatar,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonTextarea
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { AppHeaderComponent } from 'src/app/shared/app-header/app-header.component';
import { IPost, IPostComment } from 'src/app/services/post/types';
import { PostService } from 'src/app/services/post/post.service';
import { addIcons } from 'ionicons';
import {
  heartOutline,
  heartDislikeOutline,
  shareSocialOutline,
  chatbubbleOutline,
  heartSharp,
  eyeOutline,
  personCircleOutline,
  documentOutline,
  pricetagsOutline,
  thumbsUpOutline,
  sendOutline,
  pencilSharp,
  trashBinSharp
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
    IonAvatar,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonTextarea,
    AppHeaderComponent
  ]
})
export class PostDetailPage implements OnInit {
  id!: number;
  postDetail: IPost | null = null;
  isPostLoading = false;

  // comments
  comments: IPostComment[] = [];
  isCommentsLoading = false;
  totalComments = 0;
  skipComments = 0;
  limitComments = 10;
  hasMoreComments = true;
  newComment = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
      eyeOutline,
      personCircleOutline,
      documentOutline,
      pricetagsOutline,
      thumbsUpOutline,
      sendOutline,
      pencilSharp,
      trashBinSharp
    })
  }

  ngOnInit() {
    this.fetchPostDetail();
    this.fetchComments();
  }

  /**
   * Fetch post detail
   */
  fetchPostDetail() {
    if (this.isPostLoading) return;
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

  /**
   * Fetch comments
   */
  fetchComments(isRefresh = false) {
    if (this.isCommentsLoading) return;

    if (isRefresh) {
      this.skipComments = 0;
      this.comments = [];
    }

    this.isCommentsLoading = true;
    const skip = this.skipComments * this.limitComments;

    this.postsService.fetchCommentsByPostId({
      postId: this.id,
      limit: this.limitComments,
      skip: skip
    }).subscribe({
      next: (response) => {
        if (isRefresh) {
          this.comments = response.comments;
        } else {
          this.comments = [...this.comments, ...response.comments];
        }
        this.totalComments = response.total;
        this.hasMoreComments = this.comments.length < response.total;
        this.skipComments++;
        this.isCommentsLoading = false;
      },
      error: (error) => {
        console.error('❌ Failed to fetch comments:', error);
        this.isCommentsLoading = false;
      }
    })
  }

  /**
   * Load more comments
   */
  loadMoreComments(event: any) {
    if (!this.hasMoreComments) {
      event.target.complete();
      return;
    }

    this.fetchComments();
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }

  /**
   * Submit new comment (mock)
   */
  submitComment() {
    if (!this.newComment.trim()) return;

    // Mock adding comment (since API doesn't support POST)
    const mockComment: IPostComment = {
      id: Date.now(),
      body: this.newComment,
      postId: this.id,
      likes: 0,
      user: {
        id: 1,
        username: 'currentuser',
        fullName: 'Current User'
      }
    };

    this.comments.unshift(mockComment);
    this.totalComments++;
    this.newComment = '';
  }

  /**
   * Redirect for editing
   */
  redirectForEditing() {
    this.router.navigate(['/tabs/home/add-edit'], { queryParams: { id: this.id } });
  }
}
