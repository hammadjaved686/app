import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartCountSubject = new BehaviorSubject<any>({ count: 0, name: '' });
  // Expose an observable to allow components to subscribe to changes
  cartCount$: Observable<any> = this.cartCountSubject.asObservable();
  items: any[] = [];
  cartItems: any[] = [];

  setCartItems(item: any) {
    const existingItemIndex = this.cartItems.findIndex((cartItem: any) => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
      // If item exists, increment quantity
      this.cartItems[existingItemIndex].quantity++;
    } else {
      // If item doesn't exist, add the item with quantity 1
      this.cartItems.push({ ...item, quantity: 1 });
    }
  }

  getCartItems() {
    return this.cartItems
  }

  getItems() {
    // const uniqueItemsSet = new Set(this.newItems);

    // Convert the Set back to an array
    this.items = this.items.filter(item => item !== undefined);
    return this.items
  }
  
  setToCart(obj: any) {
    this.cartCountSubject.next(obj);
  }

}
