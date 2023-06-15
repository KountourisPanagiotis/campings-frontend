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
import { ICustomer, Customer } from '../../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private baseUrl = 'http://188.4.177.118:8080/cf_campings_jax_war_exploded/api';

  constructor(private http: HttpClient) { }

  getAllCustomers(): Observable<ICustomer[]> {
    const url = `${this.baseUrl}/customer/`;
    return this.http.get<any[]>(url).pipe(
      map((data) => data.map((item) => Customer.fromJSON(item)))
    );
  }

  getCustomerByCode(custCode: number): Observable<ICustomer> {
    const url = `${this.baseUrl}/customer/${custCode}`;
    return this.http.get<any>(url).pipe(
      map((data) => Customer.fromJSON(data))
    );
  }

  insertCustomer(customerDTO: ICustomer): Observable<ICustomer> {
    const url = `${this.baseUrl}/customer/`;
    return this.http.post<any>(url, customerDTO.toJSON()).pipe(
      map((data) => Customer.fromJSON(data))
    );
  }

  updateCustomer(customerDTO: ICustomer): Observable<ICustomer> {
    const url = `${this.baseUrl}/customer/${customerDTO.custCode}`;
    return this.http.put<any>(url, customerDTO.toJSON()).pipe(
      map((data) => Customer.fromJSON(data))
    );
  }

  deleteCustomer(custCode: number): Observable<ICustomer> {
    const url = `${this.baseUrl}/customer/${custCode}`;
    return this.http.delete<any>(url).pipe(
      map((data) => Customer.fromJSON(data))
    );
  }
}
