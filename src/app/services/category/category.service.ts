import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICategory, Category } from '../../models/category.model';
import { MyBaseUrlService } from '../my-base-url/my-base-url.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl: string;

  constructor(private http: HttpClient, private myBaseUrlService: MyBaseUrlService) {
    this.baseUrl = this.myBaseUrlService.myBaseUrl;
  }

  getAllCategories(): Observable<ICategory[]> {
    const url = `${this.baseUrl}/category/`;
    return this.http.get<any[]>(url).pipe(
      map((data) => data.map((item) => Category.fromJSON(item)))
    );
  }

  getCategoryByCode(catCode: string): Observable<ICategory> {
    const url = `${this.baseUrl}/category/${catCode}`;
    return this.http.get<any>(url).pipe(
      map((data) => Category.fromJSON(data))
    );
  }

  insertCategory(categoryDTO: ICategory): Observable<ICategory> {
    const url = `${this.baseUrl}/category/`;
    return this.http.post<any>(url, categoryDTO).pipe(
      map((data) => Category.fromJSON(data))
    );
  }

  updateCategory(categoryDTO: ICategory): Observable<ICategory> {
    const url = `${this.baseUrl}/category/${categoryDTO.catCode}`;
    return this.http.put<any>(url, categoryDTO).pipe(
      map((data) => Category.fromJSON(data))
    );
  }

  deleteCategory(catCode: string): Observable<ICategory> {
    const url = `${this.baseUrl}/category/${catCode}`;
    return this.http.delete<any>(url).pipe(
      map((data) => Category.fromJSON(data))
    );
  }
}
