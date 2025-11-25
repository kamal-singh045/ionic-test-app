import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, Observable, shareReplay, tap, throwError } from "rxjs";
import { IOtherUser, IPost, IPostCommentPayload, IPostCommentsResponse, IPostsListPayload, IPostsListResponse } from "./types";

const postsListInitialState: IPostsListResponse = {
  posts: [],
  total: 0,
  skip: 0,
  limit: 30
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postsListSubject = new BehaviorSubject<IPostsListResponse>(postsListInitialState);
  public postsList$ = this.postsListSubject.asObservable();

  // Cache for posts by ID using shareReplay
  private postsCache = new Map<number, Observable<IPost>>();

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Fetch all posts with pagination
   */
  public fetchPostsList(payload: IPostsListPayload): Observable<IPostsListResponse> {
    let apiUrl = 'https://dummyjson.com/posts';
    apiUrl += `?limit=${payload.limit}`;
    apiUrl += payload.skip ? `&skip=${payload.skip}` : '';
    return this.http.get<IPostsListResponse>(apiUrl).pipe(
      tap((response) => {
        console.log('📝 Fetched posts:', response);
      }),
      catchError((error) => {
        console.error('❌ Failed to fetch posts list:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Fetch posts by specific user with pagination
   */
  public fetchUserPosts(userId: number, payload: IPostsListPayload): Observable<IPostsListResponse> {
    let apiUrl = `https://dummyjson.com/posts/user/${userId}`;
    apiUrl += `?limit=${payload.limit}`;
    apiUrl += payload.skip ? `&skip=${payload.skip}` : '';
    return this.http.get<IPostsListResponse>(apiUrl).pipe(
      tap((response) => {
        console.log('👤 Fetched user posts:', response);
      }),
      catchError((error) => {
        console.error('❌ Failed to fetch user posts:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Post Search
   */
  public searchPosts(query: string): Observable<IPostsListResponse> {
    let apiUrl = `https://dummyjson.com/posts/search?q=${query}`;
    return this.http.get<IPostsListResponse>(apiUrl).pipe(
      tap((response) => {
        console.log('🔎 Searched posts:', response);
      }),
      catchError((error) => {
        console.error('❌ Failed to search posts:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Fetch post by id
   */
  public fetchPostById(id: number, forceRefresh: boolean = false): Observable<IPost> {
    // If forcing refresh, clear the cache for this post
    if (forceRefresh) {
      this.postsCache.delete(id);
    }

    // Check if we have a cached observable
    if (!this.postsCache.has(id)) {
      // Create new observable with shareReplay
      const post$ = this.http.get<IPost>(`https://dummyjson.com/posts/${id}`).pipe(
        tap((response) => {
          console.log('📝 Fetched post from API:', response);
        }),
        catchError((error) => {
          console.error('❌ Failed to fetch post:', error);
          // Remove from cache on error
          this.postsCache.delete(id);
          return throwError(() => error);
        }),
        shareReplay({ bufferSize: 1, refCount: true })
      );

      // Store in cache
      this.postsCache.set(id, post$);
    } else {
      console.log('📦 Returning cached observable for post:', id);
    }

    return this.postsCache.get(id)!;
  }

  /**
   * Clear post cache for specific ID or all posts
   */
  public clearPostCache(id?: number): void {
    if (id) {
      this.postsCache.delete(id);
      console.log('🗑️ Cleared cache for post:', id);
    } else {
      this.postsCache.clear();
      console.log('🗑️ Cleared all posts cache');
    }
  }

  /**
   * Fetch comments by post id
   */
  public fetchCommentsByPostId(payload: IPostCommentPayload): Observable<IPostCommentsResponse> {
    let apiUrl = `https://dummyjson.com/posts/${payload.postId}/comments`;
    apiUrl += `?limit=${payload.limit}`;
    apiUrl += payload.skip ? `&skip=${payload.skip}` : '';
    return this.http.get<IPostCommentsResponse>(apiUrl).pipe(
      tap((response) => {
        console.log('📝 Fetched comments:', response);
      }),
      catchError((error) => {
        console.error('❌ Failed to fetch comments:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Get user by userId
   */

  public fetchUserByUserId(userId: number): Observable<IOtherUser> {
    let apiUrl = `https://dummyjson.com/users/${userId}`;
    return this.http.get<any>(apiUrl).pipe(
      tap((response) => {
        console.log('👤 Fetched user:', response);
      }),
      catchError((error) => {
        console.error('❌ Failed to fetch user:', error);
        return throwError(() => error);
      })
    );
  }
}
