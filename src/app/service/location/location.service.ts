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


  constructor(private http:HttpClient,private authService:AuthService) { }

  setLocationDTO(locationDTO:LocationDTO){
    this.locationDTO=locationDTO;
  }

  getLocationDTO(){
    return this.locationDTO;
  }

  private createLocationURL="http://localhost:8080/location/alreadyExists";

  createLocation(locationReq:LocationDTO):Observable<LocationDTO>{
    const headers = this.authService.createAuthHeaders();
    return this.http.post<LocationDTO>(this.createLocationURL,locationReq,{headers});
  }
}
