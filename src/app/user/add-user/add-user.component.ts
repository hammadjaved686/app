import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  userForm: FormGroup;
  submitted: boolean = false
  error: boolean = false;

  constructor(private UserService: UserService,
    private dialogRef: MatDialogRef<AddUserComponent>,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)]],
      name: ['', [Validators.required, Validators.pattern(/[a-zA-Z ]{3,50}/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]+$/)]],
      avatar: [[]]
    });
  }

  submitUser(): void {
    this.submitted = true;

    if (this.userForm.valid) {
      const newUser = this.userForm.value;
      console.log('user : ', newUser)
      newUser.avatar = "https://placeimg.com/640/480/any"
      this.UserService.addUser(newUser).subscribe(
        (response: any) => {
          // Handle success: Response received from API
          console.log('User added:', response);
          this.dialogRef.close(response);

          // Additional operations based on API response
        },
        (error: any) => {
          // Handle error: Log or display an error message
          console.error('Error adding user:', error);
        }
      );

    }
    else {
      this.error = true
    }
  }
}
