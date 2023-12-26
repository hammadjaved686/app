import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-product-details-modal',
  templateUrl: './product-details-modal.component.html',
  styleUrls: ['./product-details-modal.component.css']
})
export class ProductDetailsModalComponent {
  private cartSubscription: Subscription | undefined;

  @Input() product: any; // Input property to receive product details
  @Input() close: any; // Input property to receive product details
  isClosed: boolean = true
  @Output() closeModal = new EventEmitter<void>();
  constructor(private cartService: CartService, private router: Router) { }
  userRole = ''
  isLogedIn: boolean = false;
  ngOnInit(): void {

    // this.cartSubscription = this.cartService.cartCount$.subscribe((cartItemRec) => {
    //   debugger
    //   console.log('Entity Cart ------ component call ', cartItemRec)
    //   if(cartItemRec.source ==='list-products') {
    //     setTimeout(() => {
    //       this.closeModal.emit()
    //     }, 100);
        
        
    //   }
    // });

 

  }
  addToCart(product: any): void {

    // chcekout userrole privacy to cart if not loggedIn
    this.checkUserRole()
    this.cartService.setToCart({product:product, source:'product-details'});
    this.closeModal.emit()
  }

  checkUserRole() {
    const storedUserRole = localStorage.getItem('userRole');
    if (storedUserRole) {
      this.userRole = storedUserRole;
      this.isLogedIn = true
    }
    else {
      this.isLogedIn = false
      this.router.navigate(['/authentication/login']);
    }
  }

  // ngOnDestroy(): void {
  //   // Unsubscribe from the cart subscription when the component is destroyed
  //   if (this.cartSubscription) {
  //     this.cartSubscription.unsubscribe();
  //   }
  // }

}
// {id: 3, name: 'Furniture', image: 'https://i.imgur.com/Qphac99.jpeg', creationAt: '2023-12-08T04:03:48.00'},id: 33, title: 'Unbranded Metal Pizza', price: 881, description: 'The beautiful range of Apple Naturalé that has an …ts. With the Goodness of 100% Natural Ingredients', images: ['https://i.imgur.com/3oXNBst.jpeg', 'https://i.imgur.com/ErYYZnT.jpeg', 'https://i.imgur.com/boBPwYW.jpeg']}





