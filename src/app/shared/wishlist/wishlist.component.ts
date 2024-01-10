import { Component } from '@angular/core';
import { CartService } from '../services//cart.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {
  isLoading: boolean = true; // Set it initially to true when fetching data

  dataSource = new MatTableDataSource<any>(); // Change 'any' to your ProductModel type
  constructor(private cartService: CartService, private router: Router,) {
    // this.cartItems = this.cartService.getCartItems();
    // this.cartService.setItems(this.cartItems)
   debugger
    console.log('cart Before---------Items: ', this.cartItems)
    this.isLoading = true; // Set isLoading to true before data fetching starts

    //
    this.cartItems = this.cartService.getWishlist();

    //

    this.cartItems = this.cartItems.filter((item: any) => item !== undefined);

    this.isLoading = false; // Set isLoading to false when data is fetched

    console.log('cart---------Items: ', this.cartItems)

    debugger
  }
  cartItems: any[] = [];
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
    // this.cartService.cartCount$.subscribe((cartItemRec) => {
    //   debugger
    //   console.log('Entity Cart ------ component call ', cartItemRec)
    //   // product-details
    //   const cartItem = cartItemRec.product
    //   if (cartItem?.name !== '')
    //     debugger
    //   if (cartItem)
    //     // this.cartItems.push(cartItem)
    //     this.cartItems = this.cartItems.filter((item: any) => item !== undefined);

    //   // this.cartItems = this.cartItems.filter((item, index, self) =>
    //   //   index === self.findIndex((t) => (
    //   //     t.id === item.id
    //   //   ))
    //   // );
    //   console.log('Entity Cart Items------ component call ', this.cartItems)

    //   // this.cartService.setItems(this.cartItems)
    //   // this.productCount = entityCount.count
    //   // this.childEvent.emit(`Data from Child Products Count ${entityCount.count}` );
    //   this.getTotalPrice()

    //   // this.entityCount = entityCount;
    // });

  }
  increaseQuantity(item: any): void {
    item.quantity = (item.quantity || 1) + 1;
    this.getTotalPrice()
  }

  decreaseQuantity(item: any): void {
    if (item.quantity && item.quantity > 1) {
      item.quantity -= 1;
    }
    this.getTotalPrice()
  }
  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item?.price* (item?.quantity || 1), 0);
  }
  calculateItemTotal(item: any): number {
    return item.price * (item.quantity || 1); // Default quantity to 1 if undefined
  }
  deleteItem(item: any): void {
    const index = this.cartItems.indexOf(item);
    if (index >= 0) {
      this.cartItems = this.cartItems.filter(cartItem => cartItem !== item);
      // this.dataSource._updateChangeSubscription(); // this.dataSource.data = updatedDataArray;

    }
    this.getTotalPrice()
  }
  proceedToCheckout():void{
    debugger
    this.router.navigate(['/checkout']);
  }

  addToCart(product: any): void {
    // chcekout userrole privacy to cart if not loggedIn
    this.cartService.setCartItems(product)
    this.cartService.setToCart({product:product, source:'product-details'});
  }
}
