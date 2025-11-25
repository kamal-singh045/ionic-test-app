import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonBadge,
  IonRefresher,
  IonRefresherContent,
  IonButton,
  IonHeader,
  IonToolbar,
  IonList,
  IonItem,
  IonFab,
  IonFabButton,
  IonSearchbar
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { debounceTime, distinctUntilChanged, Subject, switchMap, takeUntil } from 'rxjs';
import { IPost } from 'src/app/services/post/types';
import { PostService } from 'src/app/services/post/post.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import {
  heartOutline,
  chatbubbleOutline,
  eyeOutline,
  personCircleOutline,
  documentOutline,
  heartDislikeOutline,
  add
} from 'ionicons/icons';

type TabType = 'all' | 'my';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    RouterLink,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonIcon,
    IonBadge,
    IonRefresher,
    IonRefresherContent,
    IonButton,
    IonHeader,
    IonToolbar,
    IonList,
    IonItem,
    IonFab,
    IonFabButton,
    IonSearchbar
  ],
})
export class HomePage implements OnInit, OnDestroy {
  @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll;

  selectedTab: TabType = 'all';
  allPosts: IPost[] = [];
  myPosts: IPost[] = [];
  searchTerm: string = '';
  searchSuggestions: IPost[] = [];
  isSearching = false;

  // Pagination state for All Posts
  allPostsPage = 0;
  allPostsLimit = 10;
  allPostsTotal = 0;
  allPostsLoading = false;

  // Pagination state for My Posts
  myPostsPage = 0;
  myPostsLimit = 10;
  myPostsTotal = 0;
  myPostsLoading = false;

  currentUserId: number | null = null;

  private destroy$ = new Subject<void>();
  private searchInput$ = new Subject<string>();

  constructor(
    private postsService: PostService,
    private userService: UserService,
    private router: Router
  ) {
    addIcons({
      heartOutline,
      chatbubbleOutline,
      eyeOutline,
      personCircleOutline,
      documentOutline,
      heartDislikeOutline,
      add
    });
  }

  ngOnInit() {
    // Get current user ID
    this.userService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        if (user) {
          this.currentUserId = user.id;
        }
      });

    // Setup search with debounce
    this.setupSearchSubscription();

    // Load initial posts
    this.loadPosts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Setup search subscription
   */
  setupSearchSubscription() {
    this.searchInput$
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(query => {
          if (!query || query.trim().length === 0) {
            this.isSearching = false;
            this.searchSuggestions = [];
            return [];
          }
          this.isSearching = true;
          console.log('🔍 Searching for:', query);
          return this.postsService.searchPosts(query);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (response) => {
          if (response && response.posts) {
            console.log('✅ Search results:', response.posts.length);
            this.searchSuggestions = response.posts;
            this.isSearching = false;
          }
        },
        error: (error) => {
          console.error('❌ Search error:', error);
          this.isSearching = false;
        }
      });
  }

  /**
   * Handle search input
   */
  onSearchChange(event: any) {
    const query = event.target?.value?.trim() || '';
    this.searchTerm = query;

    if (query.length === 0) {
      this.isSearching = false;
      this.searchSuggestions = [];
    }

    this.searchInput$.next(query);
  }

  /**
   * Clear search
   */
  onSearchClear() {
    this.searchTerm = '';
    this.isSearching = false;
    this.searchSuggestions = [];
    this.searchInput$.next('');
  }

  /**
   * suggestion click
   */
  onSearchSuggestionClick(post: IPost) {
    this.router.navigate(['/tabs/home', post.id]);
  }

  /**
   * Handle tab change
   */
  onTabChange(event: any) {
    this.selectedTab = event.detail.value as TabType;

    // Load data if not already loaded
    if (this.selectedTab === 'all' && this.allPosts.length === 0) {
      this.loadPosts();
    } else if (this.selectedTab === 'my' && this.myPosts.length === 0) {
      this.loadPosts();
    }
  }

  /**
   * Load posts based on selected tab
   */
  loadPosts(isRefresh = false) {
    if (this.selectedTab === 'all') {
      this.loadAllPosts(isRefresh);
    } else {
      this.loadMyPosts(isRefresh);
    }
  }

  /**
   * Load all posts with pagination
   */
  loadAllPosts(isRefresh = false) {
    if (this.allPostsLoading) return;

    if (isRefresh) {
      this.allPostsPage = 0;
      this.allPosts = [];
    }

    this.allPostsLoading = true;
    const skip = this.allPostsPage * this.allPostsLimit;

    this.postsService.fetchPostsList({
      limit: this.allPostsLimit,
      skip: skip
    }).pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (isRefresh) {
            this.allPosts = response.posts;
          } else {
            this.allPosts = [...this.allPosts, ...response.posts];
          }
          this.allPostsTotal = response.total;
          this.allPostsPage++;
          this.allPostsLoading = false;
        },
        error: (error) => {
          console.error('❌ Failed to fetch all posts:', error);
          this.allPostsLoading = false;
        }
      });
  }

  /**
   * Load user's posts with pagination
   */
  loadMyPosts(isRefresh = false) {
    if (this.myPostsLoading || !this.currentUserId) return;

    if (isRefresh) {
      this.myPostsPage = 0;
      this.myPosts = [];
    }

    this.myPostsLoading = true;
    const skip = this.myPostsPage * this.myPostsLimit;

    this.postsService.fetchUserPosts(this.currentUserId, {
      limit: this.myPostsLimit,
      skip: skip
    }).pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (isRefresh) {
            this.myPosts = response.posts;
          } else {
            this.myPosts = [...this.myPosts, ...response.posts];
          }
          this.myPostsTotal = response.total;
          this.myPostsPage++;
          this.myPostsLoading = false;
        },
        error: (error) => {
          console.error('❌ Failed to fetch my posts:', error);
          this.myPostsLoading = false;
        }
      });
  }

  /**
   * Load more posts when scrolling
   */
  loadMore(event: any) {
    if (this.selectedTab === 'all') {
      // Check if all posts are loaded
      if (this.allPosts.length >= this.allPostsTotal) {
        event.target.complete();
        event.target.disabled = true;
        return;
      }

      this.loadAllPosts();
      setTimeout(() => {
        event.target.complete();
      }, 500);
    } else {
      // Check if all user posts are loaded
      if (this.myPosts.length >= this.myPostsTotal) {
        event.target.complete();
        event.target.disabled = true;
        return;
      }

      this.loadMyPosts();
      setTimeout(() => {
        event.target.complete();
      }, 500);
    }
  }

  /**
   * Pull to refresh
   */
  handleRefresh(event: any) {
    this.loadPosts(true);
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  /**
   * Add Floating button clicked
   */
  addButtonClicked() {
    this.router.navigate(['/tabs/home/add-edit']); // will pass a query param of post Id in case of update
  }

  /**
   * Get current posts based on selected tab
   */
  get currentPosts(): IPost[] {
    const posts = this.selectedTab === 'all' ? this.allPosts : this.myPosts;

    return posts;
  }

  /**
   * Check if loading
   */
  get isLoading(): boolean {
    return this.selectedTab === 'all' ? this.allPostsLoading : this.myPostsLoading;
  }
}
