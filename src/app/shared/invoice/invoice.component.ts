import { Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import html2canvas from 'html2canvas';
// import * as jsPDF from 'jspdf';
import { CartService } from '../services//cart.service';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StripeService } from '../services/stripe.service';
import jsPDF from 'jspdf';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent {

  today: Date = new Date(); // Define and initialize 'today' property

  name: string = '';
  address: string = '';
  city: string = '';
  postalCode: string = '';
  phone: string = '';
  email: string = '';
  isProfileAdded = false;
  safePdfUrl: SafeUrl | undefined;
  paymentType: string = '';
  userDetail: any;

  constructor(private cartService: CartService, private snackBar: MatSnackBar, private router: Router,private stripeService: StripeService,private userService: UserService) {
    // this.cartItems = this.cartService.getCartItems();
    // this.cartService.setItems(this.cartItems)
    debugger
    console.log('checkout Before---------Items: ', this.cartItems)
    debugger
    this.cartItems =  this.cartService.getCartItems()
    this.userDetail =  this.userService.getUserDetail()
    const paymentType= localStorage.getItem('paymentType');
    if(paymentType) {
      debugger
      this.paymentType = paymentType
    }
    if (this.cartItems.length === 0) {
      const storedItems = localStorage.getItem('items');
      if (storedItems) {
        this.cartItems = JSON.parse(storedItems).filter((item: any) => item !== undefined);
      }
    }
    console.log('checkout ---------Items: ', this.cartItems)
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

  generatePdf(): void {
    const invoiceContent = document.getElementById('invoice-content')!;
    const generatePdfBtn = document.querySelector('.generate-pdf-btn') as HTMLElement;
  
    // Hide the button temporarily
    if (generatePdfBtn) {
      generatePdfBtn.style.display = 'none';
    }
  
    // Create a new jsPDF instance
    const pdf = new jsPDF('p', 'mm', 'a4');
  
    // Function to convert HTML element to canvas
    const elementToCanvas = (element: HTMLElement): Promise<HTMLCanvasElement> => {
      return new Promise(resolve => {
        const canvas = document.createElement('canvas');
        const scale = 2; // Adjust scale as needed
  
        const width = element.clientWidth * scale;
        const height = element.clientHeight * scale;
  
        canvas.width = width;
        canvas.height = height;
  
        const context = canvas.getContext('2d')!;
        context.scale(scale, scale);
  
        const options = {
          backgroundColor: 'white', // Adjust background color if needed
          scale: scale
        };
  
        html2canvas(element, options).then((canvas: HTMLCanvasElement) => {
          resolve(canvas);
        });
      });
    };
  
    // Convert HTML element to canvas and add it to the PDF
    elementToCanvas(invoiceContent).then((canvas: HTMLCanvasElement) => {
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 10, 10, 180, 150); // Adjust position and size as needed
  
      // Save the PDF
      pdf.save('invoice.pdf');
      
      localStorage.removeItem('items');
      localStorage.removeItem('paymentType');
  
      // Restore the button after PDF generation
      if (generatePdfBtn) {
        generatePdfBtn.style.display = 'block';
      }
    });
  }
  

  downloadPdf(): void {
    const anchor = document.createElement('a');
    anchor.href = this.safePdfUrl as string;
    anchor.download = 'invoice.pdf';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }
  calculateTotalPrice(): number {
    let totalPrice = 0;
    for (const item of this.cartItems) {
      totalPrice += item.price * (item.quantity || 1);
    }
    return totalPrice;
  }
  processPayment(): void {
    const amount = 100; // Replace with your amount
    this.stripeService.initiatePayment(amount);
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
