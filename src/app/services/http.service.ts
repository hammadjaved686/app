import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  // Generic method to handle GET requests
  get<T>(url: string, params?: any): Observable<T> {
    debugger
    return this.http.get<T>(url, { params: new HttpParams({ fromObject: params }) });
  }

  // Generic method to handle POST requests
  post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(url, body);
  }

  // Generic method to handle PUT requests
  put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(url, body);
  }

  // Generic method to handle DELETE requests
  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }
}
