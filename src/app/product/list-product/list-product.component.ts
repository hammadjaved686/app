import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';
import { ProductService } from 'src/app/shared/services/product.service';
// import { EditProductComponent } from '../edit-product/edit-product.component';
import { DeleteConfirmationComponent } from '../../../app/shared/delete-confirmation/delete-confirmation.component'
import { MyCapitalizePipe } from 'src/app/my-capitalize-pipe.pipe'
import { AuthenticationService } from '../../shared/services/auth-service.service'
import { CategoryService } from '../../shared/services/category.service'
import { CartService } from '../../shared/services/cart.service'





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
  pageSizeOptions = [5, 10, 25, 50]; // Define your page size options
  pagedProducts: any[] = [];
  openProductDetailsModal = false;
  selectedProduct: any; // Store selected product details here
  page = 1;
  pageSize = 6;
  isAppliedFilters = false;
  userRole= ''
  categories: any[] = [];
  selectedCategory: any;
  isLogedIn: boolean = false;
  isCloseModal: boolean = false

  constructor(private http: HttpClient,private dialog: MatDialog, private productService: ProductService,
    private authService: AuthenticationService, private CategoryService: CategoryService, private cartService:CartService
    ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {

    this.checkUserRole()
    this.fetchProductList();
    this.fetchCategories();

    this.authService.entityCount$.subscribe((entityCount) => {
      debugger
      console.log('Entity Count list Product component call ', entityCount)
      this.paginateProducts();

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
    const dialogRef = this.dialog.open(AddProductComponent, {
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
    debugger
    
    if ('category' in this.filters) {
      // Find the category object in this.categories that matches categoryName in filters
      const categoryMatch = this.categories.find((category) => category.name === this.filters.category);
    
      if (categoryMatch) {
        debugger
        // Remove categoryName from this.filters
        const { category, ...restFilters } = this.filters;
        this.filters = { ...restFilters };
    
        // Add categoryId to this.filters
        this.filters.categoryId = categoryMatch.id;
      }
      debugger
    }

    this.productService.getFilteredProducts(this.filters)
      .subscribe((data: any) => {
        this.dataSource.data = data;
        this.dataSource._updateChangeSubscription();      });
  }

  paginateProducts() {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedProducts = this.dataSource.data.slice(startIndex, endIndex);
  }

  goToPage(newPage: number) {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.page = newPage;
      this.paginateProducts();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.dataSource.data.length / this.pageSize);
  }

  // Method to set selected product and open modal
  openModalWithProduct(product: any): void {
    this.selectedProduct = product;
    this.openProductDetailsModal = true;
  }
  addToCart(product: any): void {
    this.cartService.setToCart({product:product, source:'list-products'});
    this.openProductDetailsModal =false
    this.isCloseModal = true

  }
  fetchCategories(): void {
    // Make an API call to fetch categories
    debugger
    this.CategoryService.getCategorys().subscribe(
      (response: any) => {
        this.categories = response;
        debugger
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  fetchProductsByCategory(categoryId: number | string): void {
    // Make an API call to fetch products based on the selected category
    this.CategoryService.getProductsByCategory(categoryId).subscribe(
      (response: any) => {
        debugger
        // Update the products data based on the selected category
        this.pagedProducts= response;
        this.dataSource._updateChangeSubscription();

        debugger
      },
      (error) => {
        console.error(`Error fetching products for category ${categoryId}:`, error);
      }
    );
  }

  selectCategory(category: any): void {
    this.selectedCategory = category;
    if (category.id === 'All') {
      // Fetch all products
      this.fetchProductList();
    } else {
      // Fetch products based on the selected category
      this.fetchProductsByCategory(category.id);
    }
  }
  checkUserRole(){
    const storedUserRole = localStorage.getItem('userRole');
    if (storedUserRole !== null) {
      this.userRole = storedUserRole;
      this.isLogedIn = true
    }
    else {
      this.isLogedIn = false
      this.userRole = 'customer';
    }
    debugger
  }
}