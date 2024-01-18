// User.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { UserModel } from '../../../app/user/user.model';
import { environment } from '../../../enviroments/environment';

// private apiUrl = 'https://api.escuelajs.co/api/v1/Users/';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  userDetail: any;
  private localStorageKey = 'customerDetail'

  private apiUrl: string = '';

  constructor(private http: HttpClient) {
    this.apiUrl = `${environment.apiBaseUrl}Users/`
  }

  // Handle API errors
  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError(error);
  }
  setUserDetail(item: any): void {
    // Validate item before storing (optional)
    if (item && typeof item === 'object') {
      localStorage.setItem(this.localStorageKey, JSON.stringify(item));
    } else {
      console.error('Invalid item format');
    }
  }

  getUserDetail(): any {
    const storedData = localStorage.getItem(this.localStorageKey);
    // Validate and parse stored data
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        if (typeof parsedData === 'object') {
          return parsedData;
        } else {
          console.error('Invalid data format in local storage');
          return null;
        }
      } catch (error) {
        console.error('Error parsing data from local storage:', error);
        return null;
      }
    } else {
      return null;
    }
  }
  // Add User API call
  addUser(user: any): Observable<any> {
    debugger
    return this.isUserAvailable(    {email: user.email}
      ).pipe(
      switchMap((response: any) => {
        debugger
        if (response.isAvailable === false) {
          debugger
          const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
          return this.http.post<any>(this.apiUrl, user, { headers });
        } else {
          debugger
          // Return an observable with some default or error value
          return of(null); // You can modify this to return an appropriate value/error
        }
      }),
      catchError(this.handleError)
    );
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl)
      .pipe(
        catchError((error) => {
          // Custom error handling logic here if needed
          console.error('Error fetching Users:', error);
          return throwError(error);
        })
      );
  }

  getUserById(UserId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${UserId}`);
  }

  updateUser(UserId: number, updatedUserData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${UserId}`, updatedUserData);
  }

  isUserAvailable(User:any): Observable<UserModel> {
    debugger
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<UserModel>(`${this.apiUrl}is-available`, User, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  
  deleteUser(UserId: number): Observable<any> {
    debugger
    console.log(UserId, 'prodductId del')
    return this.http.delete<any>(`${this.apiUrl}${UserId}`);
  }

}
