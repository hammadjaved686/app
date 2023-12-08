import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ProductService } from 'src/app/shared/services/product.service';
import { DEFAULT_PRODUCT_IMAGE_URL } from 'src/app/constants'; // Import the constant here

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  productForm: FormGroup;

  title: string = '';
  description: string = '';
  price: string = '';
  categoryId: string = '';
  constructor(
    private productService: ProductService,
    private dialogRef: MatDialogRef<AddProductComponent>,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.productForm = this.formBuilder.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      categoryId: ['', Validators.required],
      images: [[]]
    });
  }

  submitProduct(): void {
    if (this.productForm.valid) {
      const newProduct = this.productForm.value;
      newProduct.images = [DEFAULT_PRODUCT_IMAGE_URL]; // Set the image URL from the constant
      this.productService.addProduct(newProduct).subscribe(
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
}
