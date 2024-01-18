import { Component } from '@angular/core';
import { CartService } from '../services//cart.service';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StripeService } from '../services/stripe.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-checkout-component',
  templateUrl: './checkout-component.component.html',
  styleUrls: ['./checkout-component.component.css']
})
export class CheckoutComponentComponent {
  selectedPaymentType: string = ''; // Initialize with a default value if needed
  registerForm: FormGroup;

  name: string = '';
  address: string = '';
  city: string = '';
  postalCode: string = '';
  phone: string = '';
  email: string = '';
  userRole = ''
  isLogedIn: boolean = false;
  isProfileAdded = false;
  constructor(private cartService: CartService, private dialog: MatDialog, private snackBar: MatSnackBar, private router: Router,private stripeService: StripeService, private formBuilder: FormBuilder, private userService: UserService) {
    // this.cartItems = this.cartService.getCartItems();
    // this.cartService.setItems(this.cartItems)
    this.registerForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(/^([A-Za-z]+ )*[A-Za-z]+$/),
          Validators.minLength(3),
          Validators.maxLength(50)
        ]
      ],
      address: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(300)]
      ],
      postalCode: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9]{1,20}$/),
          Validators.maxLength(20)
        ]
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\+\d{6,20}$/),
          Validators.minLength(6),
          Validators.maxLength(20)
        ]
      ],
      email: ['', [Validators.required, Validators.email]]
    });
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
  cartItems: any[] = [
  ];

  ngOnInit(): void {
    this.checkUserRole()
    if(this.cartItems.length ===0) {
      this.router.navigate(['/home'])
    }
    
  }
  openDialog(message:any): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px', // Set width or other properties as needed
      data: message // You can pass data to the dialog if needed
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      // Handle the result here if needed
     
    });
  }
  processPayment(): void {
    if(!this.isProfileAdded && !this.isLogedIn ) 
    { 
      this.openDialog('Add User detail or LoggedIn as a Customer')
      return
    }
      
    if (!this.selectedPaymentType) {
      this.openDialog('please add payment method first')
      return
    }
    if (!this.isProfileAdded) {
      this.openDialog('please add User Detail')
      return
    }
      localStorage.setItem('paymentType', this.selectedPaymentType)
      if(this.selectedPaymentType==='cash'){
         this.router.navigate(['/invoice'])
         return
      }
      this.cartService.setInvoiceItems(this.cartItems)
      this.stripeService.initiatePayment(this.cartItems);
  }
  
  submitBillingDetails(): void {
    this.isProfileAdded = true
    if (this.registerForm.valid) {
      const userDetail = this.registerForm.value;
      this.userService.setUserDetail(userDetail)
    }
  }

  checkUserRole() {
    const storedUserRole = localStorage.getItem('userRole');
    if (storedUserRole !== null) {
      this.userRole = storedUserRole;
      this.isLogedIn = true
    }
    else {
      this.isLogedIn = false
      this.userRole = 'customer';
    }
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
