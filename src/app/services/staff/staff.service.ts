import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IStaff, Staff } from '../../models/staff.model';
import { MyBaseUrlService } from '../my-base-url/my-base-url.service';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private baseUrl: string;

  constructor(private http: HttpClient, private myBaseUrlService: MyBaseUrlService) {
    this.baseUrl = this.myBaseUrlService.myBaseUrl;
  }

  getAllStaff(): Observable<IStaff[]> {
    const url = `${this.baseUrl}/staff/`;
    return this.http.get<any[]>(url).pipe(
      map((data) => data.map((item) => Staff.fromJSON(item)))
    );
  }

  getStaffByNo(staffNo: number): Observable<IStaff> {
    const url = `${this.baseUrl}/staff/${staffNo}`;
    return this.http.get<any>(url).pipe(
      map((data) => Staff.fromJSON(data))
    );
  }

  insertStaff(staff: Staff): Observable<IStaff> {
    const url = `${this.baseUrl}/staff/`;
    return this.http.post<any>(url, staff.toJSON()).pipe(
      map((data) => Staff.fromJSON(data))
    );
  }
  
  updateStaff(staff: Staff): Observable<IStaff> {
    const url = `${this.baseUrl}/staff/${staff.staffNo}`;
    return this.http.put<any>(url, staff.toJSON()).pipe(
      map((data) => Staff.fromJSON(data))
    );
  }  

  deleteStaff(staffNo: number): Observable<IStaff> {
    const url = `${this.baseUrl}/staff/${staffNo}`;
    return this.http.delete<any>(url).pipe(
      map((data) => Staff.fromJSON(data))
    );
  }
}
