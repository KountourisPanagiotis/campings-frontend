import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Camping, ICamping } from '../models/camping.model';

@Injectable()
export class CampingService {
  private apiUrl = 'http://localhost:8080/cf_campings_jax_war_exploded/api/camping/';
  constructor(private http: HttpClient) { }

  getCampings(): Observable<Camping[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(response => {
        return response.map(campingData => Camping.fromJSON(campingData));
      })
    );
  }
}
