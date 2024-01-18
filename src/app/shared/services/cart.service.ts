import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartCountSubject = new BehaviorSubject<any>({ count: 0, name: '' });
  private localStorageKey = 'inVoiceItems';
  // Expose an observable to allow components to subscribe to changes
  cartCount$: Observable<any> = this.cartCountSubject.asObservable();
  items: any[] = [];
  cartItems: any[] = [];
  wishlist: any[] = []; // Wishlist array to store items
  state: boolean[]=[false, false, false, false, false]; 
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

  addItemToWishlist(item: any) {
    const itemWithQuantity = { ...item };
    this.wishlist.push(itemWithQuantity);
  }

  // Get the wishlist
  getWishlist(): any[] {
    return this.wishlist;
  }

  setInvoiceItems(items: any[]): void {
    // Validate items before storing (optional)
    if (items && Array.isArray(items)) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(items));
    } else {
      console.error('Invalid items format');
    }
  }

  getInvoiceItems(): any[] {
    const storedData = localStorage.getItem(this.localStorageKey);
    // Validate and parse stored data
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        if (Array.isArray(parsedData)) {
          return parsedData;
        } else {
          console.error('Invalid data format in local storage');
          return [];
        }
      } catch (error) {
        console.error('Error parsing data from local storage:', error);
        return [];
      }
    } else {
      return [];
    }
  }

  getHeaderState(){
    return this.state
  }

  setHeaderState(state:any){
    this.state = state
  }
}

