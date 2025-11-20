import { Routes } from '@angular/router';

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
];

export const tabsRoutes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadComponent: () => import('./shared/bottom-tabs/bottom-tabs.component').then(m => m.BottomTabsComponent),
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
        loadComponent: () => import('./pages/user-detail/user-detail.page').then(m => m.UserDetailPage)
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
  }
]
