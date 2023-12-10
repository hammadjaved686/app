import { Component } from '@angular/core';
import { CartService } from '../services//cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  constructor(private cartService: CartService) {
    // this.cartItems = this.cartService.getCartItems();
    debugger
  }
  cartItems: any[] = [];
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.cartService.cartCount$.subscribe((cartItem) => {
    debugger
    console.log('Entity Cart  component call ', cartItem)
    this.cartItems.push(cartItem)
    
    // this.productCount = entityCount.count
    // this.childEvent.emit(`Data from Child Products Count ${entityCount.count}` );

    // this.entityCount = entityCount;
  });
}

}
