import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';
import { ProductService } from 'src/app/shared/services/product.service';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { DeleteConfirmationComponent } from '../../../app/shared/delete-confirmation/delete-confirmation.component'
import { MyCapitalizePipe } from 'src/app/my-capitalize-pipe.pipe'
import { AuthenticationService } from '../../shared/services/auth-service.service'



@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css'],
  providers: [MyCapitalizePipe]
})
export class ListProductComponent implements OnInit {
  dataSource = new MatTableDataSource<any>(); // Change 'any' to your ProductModel type
  displayedColumns: string[] = ['id', 'title', 'price', 'description', 'category', 'images', 'actions'];
  filters: any = {}; // Define your filter model here
  isAppliedFilters = false;
  constructor(private http: HttpClient,private dialog: MatDialog, private productService: ProductService,
    private authService: AuthenticationService,
    ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.fetchProductList();

    this.authService.entityCount$.subscribe((entityCount) => {
      debugger
      console.log('Entity Count list Product component call ', entityCount)

      // this.entityCount = entityCount;
    });
  }
  appliedFilters(){
 return !!this.filters.length()
}
  fetchProductList(): void {
    this.productService.getProducts().subscribe(
      (response: any[]) => {
        this.dataSource.data = response; // Assign the fetched data to dataSource
        console.log(this.dataSource.data)
        debugger
        this.authService.dothat({ name: 'products', count: this.dataSource.data.length })

      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator; // Set paginator for the MatTableDataSource
  }
  openAddProductDialog(): void {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '400px', // Set width or other properties as needed
      data: {} // You can pass data to the dialog if needed
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle the result here if needed
      console.log('Dialog closed with result:', result);

      if(result){      
        this.dataSource.data.unshift(result); // Append newObj to
      }
      this.authService.dothat({ name: 'products', count: this.dataSource.data.length })
      this.dataSource._updateChangeSubscription(); // this.dataSource.data = updatedDataArray;
      // Update product list or perform other actions based on the result
    });
  }

  openEditProductDialog(productId: number): void {
    debugger
    const dialogRef = this.dialog.open(EditProductComponent, {
      data: { productId }, // Pass the productId to the dialog if needed
      width: '400px' // Adjust as per your UI requirement
    });

    dialogRef.afterClosed().subscribe(updatedProduct => {
      if (updatedProduct) {
        // Update the product in the data source
        const index = this.dataSource.data.findIndex(p => p.id === updatedProduct.id);
        if (index > -1) {
          this.dataSource.data[index] = updatedProduct;
          this.dataSource._updateChangeSubscription();
        }
      }
    });
  }
  
 
    openDeleteConfirmation(productId: number): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '300px',
    });
  
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.productService.deleteProduct(productId).subscribe(
          () => {
            // Remove the deleted product from the data source
            const index = this.dataSource.data.findIndex(product => product.id === productId);
            if (index > -1) {
              this.dataSource.data.splice(index, 1);
              this.authService.dothat({ name: 'products', count: this.dataSource.data.length })
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
    this.productService.getFilteredProducts(this.filters)
      .subscribe((data: any) => {
        this.dataSource.data = data;
        this.dataSource._updateChangeSubscription();      });
  }
}