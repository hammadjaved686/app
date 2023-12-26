import { Component } from '@angular/core';
import { CartService } from '../services//cart.service';
import { HttpService } from '../services/http.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  constructor(private cartService: CartService, private httpService: HttpService) {
    // this.cartItems = this.cartService.getCartItems();
    // this.cartService.setItems(this.cartItems)
  //   const a =1;
  //  this.cartItems = this.cartService.getItems()

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
    //   debugger
    //     this.cartItems.push(cartItem)
    //   // this.cartItems = this.cartItems.filter(item => item.count !== 0 || item.name.trim() !== '');

    //   console.log('Entity Cart Items------ component call ', this.cartItems)

    //   // this.cartService.setItems(this.cartItems)
    //   // this.productCount = entityCount.count
    //   // this.childEvent.emit(`Data from Child Products Count ${entityCount.count}` );

    //   // this.entityCount = entityCount;
    // });

    this.httpService.cartItems$.subscribe((entityCount) => {
      debugger
      if(entityCount.message === 'sent Items Cart' && entityCount.data[0]!== undefined) {
      debugger
      console.log('Entity Count list Category component call ', entityCount)
        this.cartItems=entityCount.data
    }
      // this.entityCount = entityCount;
    });
  }
  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item?.price, 0);
  }

}
