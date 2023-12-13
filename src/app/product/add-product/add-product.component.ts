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
export class AddProductComponent {productForm: FormGroup;
  editMode: boolean = false;
  productId: number = 0;
  images: any = [[]];
  categoryId: any
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

  ngOnInit(): void {
    if (this.data && this.data.productId) {
      // Editing an existing product
      this.editMode = true;
      this.productId = this.data.productId;

      this.productService.getProductById(this.productId).subscribe(product => {
        // Pre-fill the form with fetched product details
        this.productForm.patchValue({
          title: product.title,
          price: product.price,
          description: product.description,
          categoryId: product.category.id
        });
        debugger
        this.images = product.images

      });
    }
  }

  submitProduct(): void {
    if (this.productForm.valid) {
      const productData = this.productForm.value;

      if (this.editMode && this.productId) {
        debugger
        // Update an existing product
        productData.images = this.images

        this.productService.updateProduct(this.productId, productData).subscribe(
          (response: any) => {
            // Handle success: Response received from API
            console.log('Product updated:', response);
            this.dialogRef.close(response);

            // Additional operations based on API response
          },
          (error: any) => {
            // Handle error: Log or display an error message
            console.error('Error updating product:', error);
          }
        );
      } else {
        // Add a new product
        debugger
        productData.images = [DEFAULT_PRODUCT_IMAGE_URL]; // Set the image URL from the constant
        this.productService.addProduct(productData).subscribe(
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
}