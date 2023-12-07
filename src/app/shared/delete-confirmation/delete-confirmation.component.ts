import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ParamMap } from '@angular/router';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
})
export class DeleteConfirmationComponent {
  constructor(public dialogRef: MatDialogRef<DeleteConfirmationComponent>) {}

  confirmDeletion(): void {
    this.dialogRef.close(true); // Emitting 'true' to indicate confirmation
  }

}
