import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { UserService } from "../services/user/user.service";
import { map, take } from "rxjs";

export const loginGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const router = inject(Router);

  return userService.waitForAuthCheck().pipe(
    map(isAuthenticated => {
      if (isAuthenticated) {
        console.log('Already logged in, redirecting to home');
        router.navigate(['/tabs/home']);
        return false;
      } else {
        console.log('Not logged in, keeping on login page');
        return true;
      }
    })
  );
};
