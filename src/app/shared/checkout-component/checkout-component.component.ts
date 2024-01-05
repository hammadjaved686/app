import { Component } from '@angular/core';
import { CartService } from '../services//cart.service';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StripeService } from '../services/stripe.service';


@Component({
  selector: 'app-checkout-component',
  templateUrl: './checkout-component.component.html',
  styleUrls: ['./checkout-component.component.css']
})
export class CheckoutComponentComponent {
  selectedPaymentType: string = ''; // Initialize with a default value if needed

  name: string = '';
  address: string = '';
  city: string = '';
  postalCode: string = '';
  phone: string = '';
  email: string = '';
  isProfileAdded = false;
  constructor(private cartService: CartService, private snackBar: MatSnackBar, private router: Router,private stripeService: StripeService) {
    // this.cartItems = this.cartService.getCartItems();
    // this.cartService.setItems(this.cartItems)
    debugger
    console.log('checkout Before---------Items: ', this.cartItems)
    debugger
    this.cartItems =     this.cartService.getCartItems()
    
    localStorage.setItem('items', JSON.stringify(this.cartItems))

    this.cartItems = this.cartItems.filter((item: any) => item !== undefined);
    // this.cartItems = this.cartService.getItems()
    console.log('checkout ---------Items: ', this.cartItems)
    // this.cartItems = [
    //   {
    //     title: 'shirt', price: 14, quantity:1
    //   },
    //   {
    //     title: 'pant', price: 50, quantity:1
    //   },
    //   {
    //     title: 'Book', price: 150, quantity:1
    //   },
    // ];
    debugger
  }
  userRole ='';
  cartItems: any[] = [
  ];

  ngOnInit(): void {
    const storedUserRole = localStorage.getItem('userRole');
    if (storedUserRole !== null) {
      this.userRole = storedUserRole;
    }

    
  }
  processPayment(): void {
    localStorage.setItem('paymentType', this.selectedPaymentType)
    const amount = 100; // Replace with your amount
    this.stripeService.initiatePayment(this.cartItems);
  }
  submitBillingDetails(): void {
    this.isProfileAdded = true
  }

  placeOrder(): void {
    // Your place order logic here...
  
    const snackBarRef: MatSnackBarRef<any> = this.snackBar.open('Your order has been placed!', 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar'],

    });

    // Execute a function when the snackbar is dismissed (e.g., when the "Close" button is clicked)
    snackBarRef.afterDismissed().subscribe(() => {
      // Call your function here
      this.onCloseFunction();
    });
  }

  onCloseFunction(): void {
    // Your function logic when the snackbar is closed
    this.router.navigate(['/home'])

    console.log('Snackbar closed');
    // Add your custom logic here
  }
  
}
