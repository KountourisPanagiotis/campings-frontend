// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class CustomersService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICamping, Camping } from '../../models/camping.model';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private baseUrl = 'http://localhost:8080/cf_campings_jax_war_exploded/api'; // REST API base URL

  constructor(private http: HttpClient) { }

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
