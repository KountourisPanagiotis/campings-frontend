import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IClientTransaction, ClientTransaction } from '../../models/client.transaction.model';
import { MyBaseUrlService } from '../my-base-url/my-base-url.service';

@Injectable({
  providedIn: 'root'
})
export class ClientTransactionService {
  private baseUrl: string;

  constructor(private http: HttpClient, private myBaseUrlService: MyBaseUrlService) {
    this.baseUrl = this.myBaseUrlService.myBaseUrl;
  }

  getClientTransactionByBookCode(bookCode: number): Observable<IClientTransaction> {
    const url = `${this.baseUrl}/transactions/${bookCode}`;
    return this.http.get<any>(url).pipe(
      map((data) => ClientTransaction.fromJSON(data))
    );
  }

  getAllClientTransactions(): Observable<IClientTransaction[]> {
    const url = `${this.baseUrl}/transactions/`;
    return this.http.get<any[]>(url).pipe(
      map((data) => data.map((item) => ClientTransaction.fromJSON(item)))
    );
  }

  insertClientTransaction(clientTransaction: IClientTransaction): Observable<IClientTransaction> {
    const url = `${this.baseUrl}/transactions/`;
    return this.http.post<any>(url, clientTransaction).pipe(
      map((data) => ClientTransaction.fromJSON(data))
    );
  }

  updateClientTransaction(clientTransaction: IClientTransaction): Observable<IClientTransaction> {
    const url = `${this.baseUrl}/transactions/`;
    return this.http.put<any>(url, clientTransaction).pipe(
      map((data) => ClientTransaction.fromJSON(data))
    );
  }

  deleteClientTransaction(bookCode: number): Observable<IClientTransaction> {
    const url = `${this.baseUrl}/transactions/${bookCode}`;
    return this.http.delete<any>(url).pipe(
      map((data) => ClientTransaction.fromJSON(data))
    );
  }
}
