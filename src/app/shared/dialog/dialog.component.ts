import { Component, Inject} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<DialogComponent>, private router: Router) {
    this.message = data
    const storedUserRole = localStorage.getItem('userRole');
    if (storedUserRole !== null) {
      debugger
      this.userRole = storedUserRole;
    }
    debugger
  }

  userRole = ''
  message = ''
  closeDialog(): void {
    // Close the dialog, optionally passing a result to the component that opened the dialog.
    this.dialogRef.close('Dialog closed with result');
  }
  login() {
    this.router.navigate(['authentication/login'])
  }
  // confirmDeletion(): void {
  //   this.dialogRef.close(true); // Emitting 'true' to indicate confirmation
  // }
}
