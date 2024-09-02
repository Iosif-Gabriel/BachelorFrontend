import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationDTO } from 'src/app/dtos/LocationDTO';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private locationDTO!: LocationDTO;
  locationStatus!: string;
  locationData: any;
  city!: string;


  constructor(private http:HttpClient,private authService:AuthService) { }

  setLocationDTO(locationDTO:LocationDTO){
    this.locationDTO=locationDTO;
  }

  getLocationDTO(){
    return this.locationDTO;
  }

  private createLocationURL="https://localhost:8080/location/alreadyExists";

  createLocation(locationReq:LocationDTO):Observable<number>{
    const headers = this.authService.createAuthHeaders();
    return this.http.post<number>(this.createLocationURL,locationReq,{headers});
  }


  requestUserLocation() {
    const permission = sessionStorage.getItem('locationPermission');
    if (permission !== null) {
      console.log('Location permission already set to:', permission);
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          this.savePermissionResponse(true, latitude, longitude);
          this.reverseGeocode(latitude, longitude);
        },
        (error) => {
        
          this.savePermissionResponse(false);
        }
      );
    } else {
      
      this.savePermissionResponse(false);
    }
  }

  savePermissionResponse(permissionGranted: boolean, latitude?: number, longitude?: number) {
    sessionStorage.setItem('locationPermission', JSON.stringify(permissionGranted));

  }

  reverseGeocode(latitude: number, longitude: number) {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAfy5ex7LC2TyrHSyhP1_taOWizbMvbSLk`;
    this.http.get(geocodeUrl)
    .subscribe((response: any) => {
      if (response.status === 'OK') {
        const results = response.results;
        if (results.length > 0) {
          console.log('Address:', results[0].formatted_address);
        } else {
          console.log('No address found for these coordinates.');
        }
      } else {
        console.log('Geocoding error:', response.status);
      }
    });
}
}
