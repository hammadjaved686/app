import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  categoryForm: FormGroup;

  constructor(private categoryService: CategoryService,
    private dialogRef: MatDialogRef<AddCategoryComponent>,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  submitCategory(): void {
    if (this.categoryForm.valid) {
      const newCategory = this.categoryForm.value;
      console.log('category : ', newCategory)
      newCategory.image = "https://placeimg.com/640/480/any"
      this.categoryService.addCategory(newCategory).subscribe(
        (response: any) => {
          // Handle success: Response received from API
          console.log('Category added:', response);
          this.dialogRef.close(response);

          // Additional operations based on API response
        },
        (error: any) => {
          // Handle error: Log or display an error message
          console.error('Error adding category:', error);
        }
      );

    }
  }
}
