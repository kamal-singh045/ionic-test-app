import { Injectable } from "@angular/core";
import { Geolocation, Position } from "@capacitor/geolocation";

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  constructor() { }

  // check location permission
  async checkLocationPermission(): Promise<boolean> {
    const permission = await Geolocation.checkPermissions();
    return permission.location === 'granted' || permission.coarseLocation === 'granted';
  }

  // Request location permission
  async requestLocationPermission(): Promise<boolean> {
    const permission = await Geolocation.requestPermissions({
      permissions: ['location', 'coarseLocation']
    });
    return permission.location === 'granted' || permission.coarseLocation === 'granted';
  }

  // Get current location
  async getCurrentLocation(): Promise<Position | null> {
    try {
      const hasPermission = await this.checkLocationPermission();

      if (!hasPermission) {
        const granted = await this.requestLocationPermission();
        if (!granted) {
          console.error('Location permission not granted');
          return null;
        }
      }
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      });
      return position;
    } catch (error) {
      console.error('Error getting location:', error);
      return null;
    }
  }
}
