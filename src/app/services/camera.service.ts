import { Injectable } from "@angular/core";
import { Camera, CameraResultType, CameraSource, Photo } from "@capacitor/camera";

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  constructor() { }

  // check camera permission
  async checkCameraPermission(): Promise<boolean> {
    const permission = await Camera.checkPermissions();
    return permission.camera === 'granted' || permission.photos === 'granted';
  }

  // request camera permission
  async requestCameraPermission(): Promise<boolean> {
    const permission = await Camera.requestPermissions({
      permissions: ['camera', 'photos']
    });
    return permission.camera === 'granted' || permission.photos === 'granted';
  }

  // take or pick photo
  async takeOrPickPhoto(): Promise<Photo | null> {
    try {
      const hasPermission = await this.checkCameraPermission();
      console.log({ hasPermission });
      if (!hasPermission) {
        // request permission
        const granted = await this.requestCameraPermission();
        if (!granted) {
          console.error('Camera permission not granted');
          return null;
        }
      }
      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Prompt
      });
      return photo;
    } catch (error) {
      console.error('Error taking photo:', error);
      return null;
    }
  }
}
