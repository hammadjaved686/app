import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userToken: string | null = null;
  private userInfo: any | null = null;

  setToken(token: string): void {
    this.userToken = token;
  }

  getToken(): string | null {
    return this.userToken;
  }

  setUserInfo(userInfo: any): void {
    this.userInfo = userInfo;
  }

  getUserInfo(): any | null {
    return this.userInfo;
  }
}
