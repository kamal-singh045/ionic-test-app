import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonImg
} from '@ionic/angular/standalone';
import { AppHeaderComponent } from 'src/app/shared/app-header/app-header.component';
import { CameraService } from 'src/app/services/camera.service';
import { ThemeButtonComponent } from 'src/app/shared/theme-button/theme-button.component';
import { UserService } from 'src/app/services/user/user.service';
import { Subject } from 'rxjs';
import { IUser } from 'src/app/services/user/types';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
    AppHeaderComponent,
    ThemeButtonComponent
  ]
})
export class GalleryPage implements OnInit, OnDestroy {
  userData: IUser | null = null;
  apiCallCount: number = 0;
  photos: string[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private cameraService: CameraService,
    private userService: UserService
  ) { }

  ngOnInit() {
    // this.fetchUserProfile();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async takePhoto() {
    const photo = await this.cameraService.takeOrPickPhoto();
    console.log({ photo, format: photo?.format });
    if (photo && photo?.base64String) {
      const url = `data:image/${photo?.format};base64,${photo.base64String}`;
      this.photos.unshift(url);
      // upload to server
      // body: JSON.stringify({
      //   image: photo.base64String,
      //   format: photo?.format,
      //   filename: `photo_${Date.now()}.${photo?.format}`
      // })
    }
  }

  // fetchUserProfile() {
  //   this.userService.fetchUserProfile()
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe({
  //       next: (data) => {
  //         this.userData = data;
  //         this.apiCallCount = this.userService.getApiCallCount();
  //       },
  //       error: (error) => {
  //         console.error(error);
  //       }
  //     })
  // }
}
