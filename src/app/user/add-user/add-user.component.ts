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

  constructor(private UserService: UserService,
    private dialogRef: MatDialogRef<AddUserComponent>,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userForm = this.formBuilder.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', Validators.required],
      avatar: [[]]
    });
  }

  submitUser(): void {
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
  }
}
