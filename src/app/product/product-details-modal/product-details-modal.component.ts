import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';
import { ProductService } from '../../shared/services/product.service';

import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
@Component({
  selector: 'app-product-details-modal',
  templateUrl: './product-details-modal.component.html',
  styleUrls: ['./product-details-modal.component.css']
})
export class ProductDetailsModalComponent {
  private cartSubscription: Subscription | undefined;
  selectedImage: string = '';
  currentIndex = 0;
  showLeftArrow = false;
  showRightArrow = true;
  slideAmount = 0;

  @Input() product: any; // Input property to receive product details
  @Input() close: any; // Input property to receive product details
  isClosed: boolean = true
  @Output() closeModal = new EventEmitter<void>();
  constructor(private cartService: CartService, private router: Router, private route: ActivatedRoute, private productService: ProductService) {
    this.showLeftArrow = false;
    this.showRightArrow = true;
   }
  userRole = ''
  productId: any;
  selectedImageIndex: number = 0; // Variable to store the index of the selected image
  isLogedIn: boolean = false;

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.productId = params['id']; // Retrieve the product ID from the route
      // Use this productId to fetch and display product details from your data source
    });
    this.fetchProductById(this.productId)
    // this.product = 
    // {id: 33, title: 'Unbranded Metal Pizza', price: 881, description: 'The beautiful range of Apple Naturalé that has an …ts. With the Goodness of 100% Natural Ingredients', images: ['https://i.imgur.com/3oXNBst.jpeg', 'https://i.imgur.com/ErYYZnT.jpeg', 'https://i.imgur.com/boBPwYW.jpeg']}

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
    this.cartService.setCartItems(product)
    this.cartService.setToCart({product:product, source:'product-details'});
    this.closeModal.emit()
  }

  closeModel(){
    this.router.navigate(['/shop'])
  }

  selectImage(index: number): void {
    this.selectedImageIndex = index;
  }

  changeImage(direction: string): void {
    if (direction === 'next') {
      this.selectedImageIndex = (this.selectedImageIndex + 1) % this.product.images.length;
    } else if (direction === 'prev') {
      this.selectedImageIndex = (this.selectedImageIndex - 1 + this.product.images.length) % this.product.images.length;
    }
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

  fetchProductById(id:any): void {
    this.productService.getProductById(id).subscribe(
      (response: any[]) => {
        this.product = response; // Assign the fetched data to dataSource
        this.selectedImage = this.product.images[0];

      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
  addToWishlist(item:any){
    const storedItems = localStorage.getItem('wishList');

    let items
    if (storedItems) {
      items = JSON.parse(storedItems).filter((item: any) => item !== undefined);
    }
    if(storedItems && items) {
      localStorage.setItem('wishList',item);
    }
    else{
      localStorage.setItem('wishList',item);
    }
  }
}
// {id: 3, name: 'Furniture', image: 'https://i.imgur.com/Qphac99.jpeg', creationAt: '2023-12-08T04:03:48.00'},id: 33, title: 'Unbranded Metal Pizza', price: 881, description: 'The beautiful range of Apple Naturalé that has an …ts. With the Goodness of 100% Natural Ingredients', images: ['https://i.imgur.com/3oXNBst.jpeg', 'https://i.imgur.com/ErYYZnT.jpeg', 'https://i.imgur.com/boBPwYW.jpeg']}





