import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, switchMap, mergeMap } from 'rxjs/operators';
import { ProductModel } from '../../../../src/app/product/product.model';
import { environment } from '../../../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl: string = '';

  constructor(private http: HttpClient) {
    this.apiUrl = `${environment.apiBaseUrl}Products/`
  }

  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError(error);
  }

  addProduct(product: ProductModel): Observable<ProductModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ProductModel>(this.apiUrl, product, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getFilteredProducts(filters: any): Observable<any> {
    return of(filters).pipe(
      switchMap((filterParams) => {
        const params = new HttpParams({ fromObject: filterParams });
        return this.http.get<any[]>(this.apiUrl, { params });
      }),
      catchError(this.handleError)
    );
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching products:', error);
        return throwError(error);
      })
    );
  }

  getProductById(productId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${productId}`).pipe(
      catchError(this.handleError)
    );
  }

  updateProduct(productId: number, updatedProductData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${productId}`, updatedProductData).pipe(
      catchError(this.handleError)
    );
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${productId}`).pipe(
      catchError(this.handleError)
    );
  }
}
