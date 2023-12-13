import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { UserService } from 'src/app/shared/services/user.service';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { DeleteConfirmationComponent } from '../../shared/delete-confirmation/delete-confirmation.component'



@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
})
export class ListUserComponent implements OnInit {
  dataSource = new MatTableDataSource<any>(); // Change 'any' to your UserModel type
  displayedColumns: string[] = ['id', 'title', 'price', 'description', 'category', 'avatar', 'actions'];

  constructor(private http: HttpClient,private dialog: MatDialog, private userService: UserService,) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.fetchUserList();
  }

  fetchUserList(): void {
    this.userService.getUsers().subscribe(
      (response: any[]) => {
        this.dataSource.data = response; // Assign the fetched data to dataSource
        console.log(this.dataSource.data)
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator; // Set paginator for the MatTableDataSource
  }
  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '400px', // Set width or other properties as needed
      data: {} // You can pass data to the dialog if needed
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle the result here if needed
      console.log('Dialog closed with result:', result);
      this.dataSource.data.unshift(result); // Append newObj to
      this.dataSource._updateChangeSubscription(); // this.dataSource.data = updatedDataArray;
      // Update user list or perform other actions based on the result
    });
  }

  openEditUserDialog(userId: number): void {
    debugger
    const dialogRef = this.dialog.open(EditUserComponent, {
      data: { userId }, // Pass the userId to the dialog if needed
      width: '400px' // Adjust as per your UI requirement
    });

    dialogRef.afterClosed().subscribe(updatedUser => {
      if (updatedUser) {
        // Update the user in the data source
        const index = this.dataSource.data.findIndex(p => p.id === updatedUser.id);
        if (index > -1) {
          this.dataSource.data[index] = updatedUser;
          this.dataSource._updateChangeSubscription();
        }
      }
    });
  }
  
 
    openDeleteConfirmation(userId: number): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '300px',
    });
  
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.userService.deleteUser(userId).subscribe(
          () => {
            // Remove the deleted user from the data source
            const index = this.dataSource.data.findIndex(user => user.id === userId);
            if (index > -1) {
              this.dataSource.data.splice(index, 1);
              this.dataSource._updateChangeSubscription(); // Notify the data source about the change
            }
          },
          error => {
            // Handle error if deletion fails
          }
        );
      }
    });
  }
  
}