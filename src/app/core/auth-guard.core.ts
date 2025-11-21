import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { UserService } from "../services/user.service";
import { map, take } from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  return userService.waitForAuthCheck().pipe(
    map(isAuthenticated => {
      if (isAuthenticated) {
        console.log('✅ User authenticated, allowing access');
        return true;
      } else {
        console.log('🚫 User not authenticated, redirecting to login');
        router.navigate(['/login'], {
          queryParams: { returnUrl: state.url }
        });
        return false;
      }
    })
  );
};
