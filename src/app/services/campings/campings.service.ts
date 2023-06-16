import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICamping, Camping } from '../../models/camping.model';
import { MyBaseUrlService } from '../my-base-url/my-base-url.service';

@Injectable({
  providedIn: 'root'
})
export class CampingsService {
  private baseUrl: string;

  constructor(private http: HttpClient, private myBaseUrlService: MyBaseUrlService) {
    this.baseUrl = this.myBaseUrlService.myBaseUrl;
  }

  getAllCampings(): Observable<ICamping[]> {
    const url = `${this.baseUrl}/camping/`;
    return this.http.get<any[]>(url).pipe(
      map((data) => data.map((item) => Camping.fromJSON(item)))
    );
  }

  getCampingByCode(campCode: string): Observable<ICamping> {
    const url = `${this.baseUrl}/camping/${campCode}`;
    return this.http.get<any>(url).pipe(
      map((data) => Camping.fromJSON(data))
    );
  }

  insertCamping(campingDTO: ICamping): Observable<ICamping> {
    const url = `${this.baseUrl}/camping/`;
    return this.http.post<any>(url, campingDTO.toJSON()).pipe(
      map((data) => Camping.fromJSON(data))
    );
  }

  updateCamping(campingDTO: ICamping): Observable<ICamping> {
    const url = `${this.baseUrl}/camping/${campingDTO.campCode}`;
    return this.http.put<any>(url, campingDTO.toJSON()).pipe(
      map((data) => Camping.fromJSON(data))
    );
  }

  deleteCamping(campCode: string): Observable<ICamping> {
    const url = `${this.baseUrl}/camping/${campCode}`;
    return this.http.delete<any>(url).pipe(
      map((data) => Camping.fromJSON(data))
    );
  }
}
