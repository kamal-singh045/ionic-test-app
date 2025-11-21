import { HttpInterceptorFn } from "@angular/common/http";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Skip adding token for login endpoint
  if (req.url.includes('/auth/login')) {
    return next(req);
  }
  const token = localStorage.getItem('accessToken');
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  return next(req);
}
