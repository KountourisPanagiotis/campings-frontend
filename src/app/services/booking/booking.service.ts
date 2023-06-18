import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IBooking, Booking } from '../../models/booking.model';
import { MyBaseUrlService } from '../my-base-url/my-base-url.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private baseUrl: string;

  constructor(private http: HttpClient, private myBaseUrlService: MyBaseUrlService) {
    this.baseUrl = this.myBaseUrlService.myBaseUrl;
  }

  getAllBookings(): Observable<IBooking[]> {
    const url = `${this.baseUrl}/booking/`;
    return this.http.get<any[]>(url).pipe(
      map((data) => data.map((item) => Booking.fromJSON(item)))
    );
  }

  getBookingByCode(bookCode: number): Observable<IBooking> {
    const url = `${this.baseUrl}/booking/${bookCode}`;
    return this.http.get<any>(url).pipe(
      map((data) => Booking.fromJSON(data))
    );
  }

  insertBooking(bookingDTO: IBooking): Observable<IBooking> {
    const url = `${this.baseUrl}/booking/`;
    return this.http.post<any>(url, bookingDTO.toJSON()).pipe(
      map((data) => Booking.fromJSON(data))
    );
  }

  updateBooking(bookingDTO: IBooking): Observable<IBooking> {
    const url = `${this.baseUrl}/booking/${bookingDTO.bookCode}`;
    return this.http.put<any>(url, bookingDTO.toJSON()).pipe(
      map((data) => Booking.fromJSON(data))
    );
  }

  deleteBooking(bookCode: number): Observable<IBooking> {
    const url = `${this.baseUrl}/booking/${bookCode}`;
    return this.http.delete<any>(url).pipe(
      map((data) => Booking.fromJSON(data))
    );
  }
}
