import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, switchMap, mergeMap } from 'rxjs/operators';
import { CategoryModel } from '../../category/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'https://api.escuelajs.co/api/v1/Categories/';

  constructor(private http: HttpClient) {}

  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError(error);
  }

  addCategory(Category: CategoryModel): Observable<CategoryModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<CategoryModel>(this.apiUrl, Category, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getFilteredCategorys(filters: any): Observable<any> {
    return of(filters).pipe(
      switchMap((filterParams) => {
        const params = new HttpParams({ fromObject: filterParams });
        return this.http.get<any[]>(this.apiUrl, { params });
      }),
      catchError(this.handleError)
    );
  }

  getCategorys(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching Categorys:', error);
        return throwError(error);
      })
    );
  }

  getCategoryById(CategoryId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${CategoryId}`).pipe(
      catchError(this.handleError)
    );
  }

  updateCategory(CategoryId: number, updatedCategoryData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${CategoryId}`, updatedCategoryData).pipe(
      catchError(this.handleError)
    );
  }

  deleteCategory(CategoryId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${CategoryId}`).pipe(
      catchError(this.handleError)
    );
  }
}
