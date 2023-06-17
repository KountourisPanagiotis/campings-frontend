import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IEmplacement, Emplacement } from '../../models/emplacement.model';
import { MyBaseUrlService } from '../my-base-url/my-base-url.service';

@Injectable({
  providedIn: 'root'
})
export class EmplacementService {
  private baseUrl: string;

  constructor(private http: HttpClient, private myBaseUrlService: MyBaseUrlService) {
    this.baseUrl = this.myBaseUrlService.myBaseUrl;
  }

  getAllEmplacements(): Observable<IEmplacement[]> {
    const url = `${this.baseUrl}/emplacement/`;
    return this.http.get<any[]>(url).pipe(
      map((data) => data.map((item) => Emplacement.fromJSON(item)))
    );
  }

  getEmplacementByCode(campCode: string, empNo: number): Observable<IEmplacement> {
    const url = `${this.baseUrl}/emplacement/${campCode}/${empNo}`;
    return this.http.get<any>(url).pipe(
      map((data) => Emplacement.fromJSON(data))
    );
  }

  insertEmplacement(emplacementDTO: IEmplacement): Observable<IEmplacement> {
    const url = `${this.baseUrl}/emplacement/`;
    return this.http.post<any>(url, emplacementDTO.toJSON()).pipe(
      map((data) => Emplacement.fromJSON(data))
    );
  }

  updateEmplacement(emplacementDTO: IEmplacement): Observable<IEmplacement> {
    const url = `${this.baseUrl}/emplacement/${emplacementDTO.campCode}/${emplacementDTO.empNo}`;
    return this.http.put<any>(url, emplacementDTO.toJSON()).pipe(
      map((data) => Emplacement.fromJSON(data))
    );
  }

  deleteEmplacement(campCode: string, empNo: number): Observable<IEmplacement> {
    const url = `${this.baseUrl}/emplacement/${campCode}/${empNo}`;
    return this.http.delete<any>(url).pipe(
      map((data) => Emplacement.fromJSON(data))
    );
  }
}
