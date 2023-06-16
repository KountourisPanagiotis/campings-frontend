import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPayment, Payment } from '../../models/payment.model';
import { MyBaseUrlService } from '../my-base-url/my-base-url.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl: string;

  constructor(private http: HttpClient, private myBaseUrlService: MyBaseUrlService) {
    this.baseUrl = this.myBaseUrlService.myBaseUrl;
  }

  getPaymentByCode(payCode: number): Observable<IPayment> {
    const url = `${this.baseUrl}/payment/${payCode}`;
    return this.http.get<any>(url).pipe(
      map((data) => Payment.fromJSON(data))
    );
  }

  getAllPayments(): Observable<IPayment[]> {
    const url = `${this.baseUrl}/payment`;
    return this.http.get<any[]>(url).pipe(
      map((data) => data.map((item) => Payment.fromJSON(item)))
    );
  }

  insertPayment(paymentDTO: IPayment): Observable<IPayment> {
    const url = `${this.baseUrl}/payment`;
    return this.http.post<any>(url, paymentDTO).pipe(
      map((data) => Payment.fromJSON(data))
    );
  }

  updatePayment(paymentDTO: IPayment): Observable<IPayment> {
    const url = `${this.baseUrl}/payment/${paymentDTO.payCode}`;
    return this.http.put<any>(url, paymentDTO).pipe(
      map((data) => Payment.fromJSON(data))
    );
  }

  deletePayment(payCode: number): Observable<IPayment> {
    const url = `${this.baseUrl}/payment/${payCode}`;
    return this.http.delete<any>(url).pipe(
      map((data) => Payment.fromJSON(data))
    );
  }
}
