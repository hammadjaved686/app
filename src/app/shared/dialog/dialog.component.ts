import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<DialogComponent>) {
    this.message = data

  }
  message = ''
  closeDialog(): void {
    // Close the dialog, optionally passing a result to the component that opened the dialog.
    this.dialogRef.close('Dialog closed with result');
  }
  // confirmDeletion(): void {
  //   this.dialogRef.close(true); // Emitting 'true' to indicate confirmation
  // }
}
