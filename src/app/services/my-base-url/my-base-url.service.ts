import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyBaseUrlService {
  myBaseUrl: string = 'http://188.4.177.118:8080/cf_campings_jax_war_exploded/api';

  constructor() { }
}
