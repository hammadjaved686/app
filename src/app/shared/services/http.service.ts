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
  post<T>(url: string, params: any, body: any): Observable<T> {
    // Create an HttpParams object to store the request parameters
    debugger
    let httpParams = new HttpParams();
    // Add each parameter to the HttpParams object
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        httpParams = httpParams.append(key, params[key]);
      }
    }
    // Make the HTTP request with the parameters included in the URL
    return this.http.post<T>(url, body, { params: httpParams });
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
