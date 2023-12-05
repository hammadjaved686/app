import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  productForm: FormGroup;

  constructor(
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
      console.log('product : ', newProduct)
      newProduct.images = ["https://placeimg.com/640/480/any"]
      this.http.post('https://api.escuelajs.co/api/v1/products/', newProduct).subscribe((response) => {
        this.dialogRef.close(response);
      });
    }
  }
}
