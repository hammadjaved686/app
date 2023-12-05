import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/product.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productForm: FormGroup;
  productId!: number; // Declare productId to store the product ID to edit

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {
    this.productForm = this.formBuilder.group({
      title: '',
      price: 0,
      // description: ''
      // Add other form controls for your product fields
    });
  }

  ngOnInit(): void {
    debugger
    // Get the product ID from the route params
    this.route.paramMap.subscribe((params: ParamMap) => {
      debugger
      this.productId = this.data.productId;
    });    
    // Fetch the product details based on the ID
    this.productService.getProductById(this.productId).subscribe(product => {
      // Pre-fill the form with fetched product details
      this.productForm.patchValue({
        title: product.title,
        price: product.price,
        // description: product.description
        // Patch other form controls for your product fields
      });
    });
  }

  onSubmit(): void {
    const updatedProduct = this.productForm.value;
    // Update the product using the productService
    this.productService.updateProduct(this.productId, updatedProduct).subscribe(
      (response: any) => {
        // Handle success: Response received from API
        console.log('Product added:', response);
        this.dialogRef.close(response);

        // Additional operations based on API response
      },
      (error: any) => {
        // Handle error: Log or display an error message
        console.error('Error adding product:', error);
      }
    );
  }
}
