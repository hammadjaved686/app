import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: any[] = [];
  private cartCountSubject = new BehaviorSubject<any>({ count: 0, name: '' });


  // Expose an observable to allow components to subscribe to changes
  cartCount$: Observable<any> = this.cartCountSubject.asObservable();

  addToCart(product: any): void {
    debugger
    this.cartItems.push(product);
  }

  setToCart(obj:any) {
    this.cartCountSubject.next(obj);

  }

  getCartItems(): any[] {
    return this.cartItems;
  }
}
