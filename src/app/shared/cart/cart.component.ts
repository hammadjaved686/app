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
    console.log('Entity Cart ------ component call ', cartItem)
    if(cartItem.name !=='')
    this.cartItems.push(cartItem)
    // this.cartItems = this.cartItems.filter(item => item.count !== 0 || item.name.trim() !== '');

    console.log('Entity Cart Items------ component call ', this.cartItems)
    
    // this.productCount = entityCount.count
    // this.childEvent.emit(`Data from Child Products Count ${entityCount.count}` );

    // this.entityCount = entityCount;
  });
}

}
