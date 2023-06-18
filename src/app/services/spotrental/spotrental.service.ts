import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ISpotrental, Spotrental } from '../../models/spotrental.model';
import { MyBaseUrlService } from '../my-base-url/my-base-url.service';

@Injectable({
  providedIn: 'root'
})
export class SpotrentalService {
  private baseUrl: string;

  constructor(private http: HttpClient, private myBaseUrlService: MyBaseUrlService) {
    this.baseUrl = this.myBaseUrlService.myBaseUrl;
  }

  getAllSpotrentals(): Observable<ISpotrental[]> {
    const url = `${this.baseUrl}/spotrental/`;
    return this.http.get<any[]>(url).pipe(
      map((data) => data.map((item) => Spotrental.fromJSON(item)))
    );
  }

  getSpotrentalByCode(bookCode: number): Observable<ISpotrental> {
    const url = `${this.baseUrl}/spotrental/${bookCode}`;
    return this.http.get<any>(url).pipe(
      map((data) => Spotrental.fromJSON(data))
    );
  }

  insertSpotrental(spotrentalDTO: ISpotrental): Observable<ISpotrental> {
    const url = `${this.baseUrl}/spotrental/`;
    return this.http.post<any>(url, spotrentalDTO.toJSON()).pipe(
      map((data) => Spotrental.fromJSON(data))
    );
  }

  updateSpotrental(spotrentalDTO: ISpotrental): Observable<ISpotrental> {
    const url = `${this.baseUrl}/spotrental/${spotrentalDTO.bookCode}`;
    return this.http.put<any>(url, spotrentalDTO.toJSON()).pipe(
      map((data) => Spotrental.fromJSON(data))
    );
  }

  deleteSpotrental(bookCode: number): Observable<ISpotrental> {
    const url = `${this.baseUrl}/spotrental/${bookCode}`;
    return this.http.delete<any>(url).pipe(
      map((data) => Spotrental.fromJSON(data))
    );
  }
}
