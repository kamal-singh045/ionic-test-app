import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { tap, shareReplay, delay, catchError, filter, take, map } from 'rxjs/operators';

export interface IUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // BehaviorSubject to hold current user (like React Context)
  private currentUserSubject = new BehaviorSubject<IUser | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  // Observable to check if user is authenticated
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  // Add loading state to prevent premature redirects
  private isLoadingSubject = new BehaviorSubject<boolean>(true);
  public isLoading$ = this.isLoadingSubject.asObservable();

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.checkAuthStatus();
  }

  private checkAuthStatus() {
    const token = this.getToken();
    if (token) {
      this.getCurrentUser().subscribe({
        next: () => {
          console.log("User Authenticated");
          this.isAuthenticatedSubject.next(true);
          this.isLoadingSubject.next(false);
        },
        error: () => {
          console.log("User Not Authenticated");
          this.isAuthenticatedSubject.next(false);
          this.isLoadingSubject.next(false);
          this.logout();
        }
      })
    } else {
      this.isAuthenticatedSubject.next(false);
      this.isLoadingSubject.next(false);
    }
  }

  public waitForAuthCheck(): Observable<boolean> {
    return this.isLoading$.pipe(
      filter(loading => !loading),
      take(1),
      map(() => this.isAuthenticatedSubject.value)
    );
  }

  public login(username: string, password: string) {
    const apiUrl = 'https://dummyjson.com/auth/login';
    return this.http.post(apiUrl, { username, password, expiresInMins: 14400 }).pipe(
      tap((response: any) => {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        this.isAuthenticatedSubject.next(true);

        // Fetch current user
        this.getCurrentUser().subscribe();
      }),
      catchError((error) => {
        console.error('❌ Login failed:', error);
        return throwError(() => error);
      })
    );
  }

  public getCurrentUser() {
    const apiUrl = 'https://dummyjson.com/auth/me';
    return this.http.get<IUser>(apiUrl).pipe(
      tap((user) => {
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
      }),
      catchError((error) => {
        console.error('❌ Failed to fetch user:', error);
        this.logout();
        return throwError(() => error);
      }),
      shareReplay(1)
    );
  }

  /**
   * Logout user
   */
  public logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  /**
   * Get token from localStorage
   */
  public getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  /**
   * Check if user is authenticated (synchronous)
   */
  public isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  /**
   * Get current user value (synchronous)
   */
  public getCurrentUserValue(): IUser | null {
    return this.currentUserSubject.value;
  }
}
