import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, Observable, tap, throwError } from "rxjs";
import { IPost, IPostCommentPayload, IPostCommentsResponse, IPostsListPayload, IPostsListResponse } from "./types";

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
  public fetchPostById(id: number): Observable<IPost> {
    let apiUrl = `https://dummyjson.com/posts/${id}`;
    return this.http.get<IPost>(apiUrl).pipe(
      tap((response) => {
        console.log('📝 Fetched post:', response);
      }),
      catchError((error) => {
        console.error('❌ Failed to fetch post:', error);
        return throwError(() => error);
      })
    );
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
}
