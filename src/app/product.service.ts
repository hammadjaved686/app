// product.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProductModel } from 'src/app/product/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://api.escuelajs.co/api/v1/products/';

  constructor(private http: HttpClient) {}

  // Handle API errors
  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError(error);
  }

  // Add product API call
  addProduct(product: ProductModel): Observable<ProductModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ProductModel>(this.apiUrl, product, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl)
      .pipe(
        catchError((error) => {
          // Custom error handling logic here if needed
          console.error('Error fetching products:', error);
          return throwError(error);
        })
      );
  }
}
