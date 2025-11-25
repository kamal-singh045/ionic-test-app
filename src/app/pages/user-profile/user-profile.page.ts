import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonSpinner,
  IonCard,
  IonCardHeader,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonCardContent
} from '@ionic/angular/standalone';
import { AppHeaderComponent } from 'src/app/shared/app-header/app-header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { IOtherUser, IPost } from 'src/app/services/post/types';
import { PostService } from 'src/app/services/post/post.service';
import { ProfileHeroComponent } from 'src/app/shared/profile-hero/profile-hero.component';
import { PostCardComponent } from 'src/app/shared/post-card/post-card.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    IonSpinner,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    AppHeaderComponent,
    ProfileHeroComponent,
    PostCardComponent
  ]
})
export class UserProfilePage implements OnInit {
  userId!: number;
  userData: IOtherUser | null = null;
  isUserLoading: boolean = false;

  // current user posts
  userPosts: IPost[] = [];
  postsTotal = 0;
  postsSkip = 0;
  postsLimit = 10;
  isPostsLoading = false;
  hasMorePosts = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.userId = Number(params['userId']);
    });
    this.fetchUserById();
    this.fetchPostsByUserId();
  }

  /**
   * Fetch user by id
   * @returns 
   */
  fetchUserById() {
    if (this.isUserLoading) return;
    this.isUserLoading = true;
    this.postService.fetchUserByUserId(this.userId).subscribe({
      next: (response) => {
        this.userData = response;
        this.isUserLoading = false;
      },
      error: (error) => {
        console.error('❌ Failed to fetch user:', error);
        this.isUserLoading = false;
      }
    })
  }

  /**
   * fetch user posts
   * @param isRefresh 
   * @returns 
   */
  fetchPostsByUserId(isRefresh = false) {
    if (this.isPostsLoading) return;

    if (isRefresh) {
      this.postsSkip = 0;
      this.postsTotal = 0;
      this.userPosts = [];
      this.hasMorePosts = true; // Reset hasMorePosts on refresh
    }

    this.isPostsLoading = true;
    const skip = this.postsSkip * this.postsLimit;

    this.postService.fetchUserPosts(this.userId, {
      limit: this.postsLimit,
      skip: skip
    }).subscribe({
      next: (response) => {
        if (isRefresh) {
          this.userPosts = response.posts;
        } else {
          this.userPosts = [...this.userPosts, ...response.posts];
        }
        this.postsTotal = response.total;
        this.postsSkip++;

        // Check if there are more posts to load
        this.hasMorePosts = this.userPosts.length < this.postsTotal;
        this.isPostsLoading = false;
      },
      error: (error) => {
        console.error('❌ Failed to fetch user posts:', error);
        this.isPostsLoading = false;
      }
    })
  }

  /**
   * Load more posts
   * @param event 
   * @returns 
   */
  loadMorePosts(event: any) {
    if (!this.hasMorePosts) {
      event.target.complete();
      return;
    }
    this.fetchPostsByUserId();
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }
}
