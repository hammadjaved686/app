import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup;
  userId!: number; // Declare userId to store the user ID to edit

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {
    this.userForm = this.formBuilder.group({
      title: '',
      price: 0,
      // description: ''
      // Add other form controls for your user fields
    });
  }

  ngOnInit(): void {
    debugger
    // Get the user ID from the route params
    this.route.paramMap.subscribe((params: ParamMap) => {
      debugger
      debugger
      this.userId = this.data.userId;
    });    
    // Fetch the user details based on the ID
    debugger
    this.userService.getUserById(this.userId).subscribe(user => {
      // Pre-fill the form with fetched user details
      debugger
      this.userForm.patchValue({
        email: user.email,
        name: user.name,
        // description: user.description
        // Patch other form controls for your user fields
      });
    });
  }

  onSubmit(): void {
    const updatedUser = this.userForm.value;
    // Update the user using the userService
    this.userService.updateUser(this.userId, updatedUser).subscribe(
      (response: any) => {
        // Handle success: Response received from API
        console.log('User added:', response);
        this.dialogRef.close(response);

        // Additional operations based on API response
      },
      (error: any) => {
        // Handle error: Log or display an error message
        debugger
        console.error('Error adding user:', error);
      }
    );
  }
}
