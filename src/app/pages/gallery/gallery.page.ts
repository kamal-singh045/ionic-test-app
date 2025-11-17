import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonButton,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonImg
} from '@ionic/angular/standalone';
import {
  Camera,
  CameraResultType,
  CameraSource
} from '@capacitor/camera';
import { AppHeaderComponent } from 'src/app/shared/app-header/app-header.component';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonButton,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
    AppHeaderComponent
  ]
})
export class GalleryPage implements OnInit {

  photos: string[] = [];

  constructor() { }

  ngOnInit() { }

  async takePhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    image.dataUrl && this.photos.unshift(image.dataUrl);
  }
}
