import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  categoryId!: number; // Declare categoryId to store the category ID to edit

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<EditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {
    this.categoryForm = this.formBuilder.group({
      name: '',
      image: '',
      // description: ''
      // Add other form controls for your category fields
    });
  }

  ngOnInit(): void {
    debugger
    // Get the category ID from the route params
    this.route.paramMap.subscribe((params: ParamMap) => {
      debugger
      this.categoryId = this.data.categoryId;
    });    
    // Fetch the category details based on the ID
    this.categoryService.getCategoryById(this.categoryId).subscribe(category => {
      // Pre-fill the form with fetched category details
      this.categoryForm.patchValue({
        name: category.name,
        image: category.image,
        // description: category.description
        // Patch other form controls for your category fields
      });
    });
  }

  onSubmit(): void {
    const updatedCategory = this.categoryForm.value;
    // Update the category using the categoryService
    this.categoryService.updateCategory(this.categoryId, updatedCategory).subscribe(
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
