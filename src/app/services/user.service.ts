import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { tap, shareReplay, delay } from 'rxjs/operators';

export interface IUserProfile {
  name: string;
  email: string;
  phone: string;
  designation: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userProfileCache$: Observable<IUserProfile> | null = null;
  private userProfileSubject = new BehaviorSubject<IUserProfile | null>(null);

  public userProfile$ = this.userProfileSubject.asObservable();
  private apiCallCount = 0;

  constructor() { }

  public fetchUserProfile(forceRefresh = false): Observable<IUserProfile> {
    if (!this.userProfileCache$ || forceRefresh) {
      this.apiCallCount++;
      console.log(`API Called - Count: ${this.apiCallCount}`);
      const dummyData: IUserProfile = {
        name: 'Kamal Singh',
        email: 'kamal.singh@example.com',
        phone: '9876543210',
        designation: 'Backend Developer'
      };
      // this.userProfileCache$ = this.http.get<IUserProfile>('/assets/user')
      //   .pipe(
      //     tap(data => this.userProfileSubject.next(data)),
      //     shareReplay(1) // Cache the result
      //   );
      this.userProfileCache$ = of(dummyData).pipe(
        delay(1000), // Simulate network delay
        tap(data => {
          console.log('Data fetched and cached:', data);
          this.userProfileSubject.next(data);
        }),
        shareReplay(1) // Cache the result
      );
    }
    return this.userProfileCache$;
  }

  public clearCache() {
    console.log('Cache cleared');
    this.userProfileCache$ = null;
    this.userProfileSubject.next(null);
    this.apiCallCount = 0;
  }

  public getCachedProfile(): IUserProfile | null {
    return this.userProfileSubject.value;
  }

  public getApiCallCount(): number {
    return this.apiCallCount;
  }
}
