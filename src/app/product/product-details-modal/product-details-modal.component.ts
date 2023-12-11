import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-product-details-modal',
  templateUrl: './product-details-modal.component.html',
  styleUrls: ['./product-details-modal.component.css']
})
export class ProductDetailsModalComponent {
  @Input() product: any; // Input property to receive product details
  @Output() closeModal = new EventEmitter<void>();
  constructor(private cartService: CartService) {}

  addToCart(product: any): void {
    debugger
    this.cartService.setToCart(product);
    this.closeModal.emit()
  }

}


// {id: 3, name: 'Furniture', image: 'https://i.imgur.com/Qphac99.jpeg', creationAt: '2023-12-08T04:03:48.00'},id: 33, title: 'Unbranded Metal Pizza', price: 881, description: 'The beautiful range of Apple Naturalé that has an …ts. With the Goodness of 100% Natural Ingredients', images: ['https://i.imgur.com/3oXNBst.jpeg', 'https://i.imgur.com/ErYYZnT.jpeg', 'https://i.imgur.com/boBPwYW.jpeg']}
  



 
