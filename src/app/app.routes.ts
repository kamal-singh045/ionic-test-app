import { Routes } from '@angular/router';
import { authGuard } from './core/auth-guard.core';
import { loginGuard } from './core/login-guard.core';

// for side mene
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'gallery',
    loadComponent: () => import('./pages/gallery/gallery.page').then(m => m.GalleryPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then(m => m.ProfilePage)
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.page').then(m => m.SettingsPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
];

export const tabsRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage),
    canActivate: [loginGuard],
  },
  {
    path: 'tabs',
    loadComponent: () => import('./shared/bottom-tabs/bottom-tabs.component').then(m => m.BottomTabsComponent),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage)
      },
      {
        path: 'home/:id',
        loadComponent: () => import('./pages/post-detail/post-detail.page').then(m => m.PostDetailPage)
      },
      {
        path: 'gallery',
        loadComponent: () => import('./pages/gallery/gallery.page').then(m => m.GalleryPage)
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile.page').then(m => m.ProfilePage)
      },
      {
        path: 'settings',
        loadComponent: () => import('./pages/settings/settings.page').then(m => m.SettingsPage)
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'login' // fallback route
  }
];
