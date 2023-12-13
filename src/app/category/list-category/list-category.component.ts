import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { CategoryService } from 'src/app/shared/services/category.service';
import { EditCategoryComponent } from '../edit-category/edit-category.component';
import { DeleteConfirmationComponent } from '../../shared/delete-confirmation/delete-confirmation.component'
import { AuthenticationService } from '../../shared/services/auth-service.service'



@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css'],
})
export class ListCategoryComponent implements OnInit {
  dataSource = new MatTableDataSource<any>(); // Change 'any' to your CategoryModel type
  displayedColumns: string[] = ['id', 'name','image'];
  filters: any = {}; // Define your filter model here
  isAppliedFilters = false;
  constructor(private http: HttpClient,private dialog: MatDialog, private categoryService: CategoryService,
    private authService: AuthenticationService,
    ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.fetchCategoryList();

    this.authService.entityCount$.subscribe((entityCount) => {
      debugger
      console.log('Entity Count list Category component call ', entityCount)
      // this.authService.dothat( { message:'cat-count-list', data:categoryCounts})

      if(entityCount.message==='cat-count-list'){
        console.log(entityCount.data)  
      }
      if(entityCount.message==='selected-category'){
        console.log(entityCount.data)  
      }

      // this.entityCount = entityCount;
    });
  }
  appliedFilters(){
 return !!this.filters.length()
}
  fetchCategoryList(): void {
    this.categoryService.getCategorys().subscribe(
      (response: any[]) => {
        this.dataSource.data = response; // Assign the fetched data to dataSource
        console.log(this.dataSource.data)
        debugger
        // this.authService.dothat({ name: 'categorys', count: this.dataSource.data.length })

      },
      (error) => {
        console.error('Error fetching categorys:', error);
      }
    );

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator; // Set paginator for the MatTableDataSource
  }
  openAddCategoryDialog(): void {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '400px', // Set width or other properties as needed
      data: {} // You can pass data to the dialog if needed
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle the result here if needed
      console.log('Dialog closed with result:', result);
      this.dataSource.data.unshift(result); // Append newObj to
      // this.authService.dothat({ name: 'categorys', count: this.dataSource.data.length })
      this.dataSource._updateChangeSubscription(); // this.dataSource.data = updatedDataArray;
      // Update category list or perform other actions based on the result
    });
  }

  openEditCategoryDialog(categoryId: number): void {
    debugger
    const dialogRef = this.dialog.open(EditCategoryComponent, {
      data: { categoryId }, // Pass the categoryId to the dialog if needed
      width: '400px' // Adjust as per your UI requirement
    });

    dialogRef.afterClosed().subscribe(updatedCategory => {
      if (updatedCategory) {
        // Update the category in the data source
        const index = this.dataSource.data.findIndex(p => p.id === updatedCategory.id);
        if (index > -1) {
          this.dataSource.data[index] = updatedCategory;
          this.dataSource._updateChangeSubscription();
        }
      }
    });
  }
  
 
    openDeleteConfirmation(categoryId: number): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '300px',
    });
  
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.categoryService.deleteCategory(categoryId).subscribe(
          () => {
            // Remove the deleted category from the data source
            const index = this.dataSource.data.findIndex(category => category.id === categoryId);
            if (index > -1) {
              this.dataSource.data.splice(index, 1);
              // this.authService.dothat({ name: 'categorys', count: this.dataSource.data.length })
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
  applyFilters() {
    this.isAppliedFilters = true
    this.categoryService.getFilteredCategorys(this.filters)
      .subscribe((data: any) => {
        this.dataSource.data = data;
        this.dataSource._updateChangeSubscription();      });
  }
}