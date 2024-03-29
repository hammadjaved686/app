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
import { count } from 'console';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  providers: [MyCapitalizePipe],
})
export class ShopComponent {
  
  dataSource = new MatTableDataSource<any>(); // Change 'any' to your ProductModel type
  displayedColumns: string[] = ['id', 'title', 'price', 'description', 'category', 'images', 'actions'];
  filters: any = {}; // Define your filter model here
  pageSizeOptions = [5, 10, 25, 50]; // Define your page size options
  pagedProducts: any[] = [];
  openProductDetailsModal = false;
  selectedProduct: any; // Store selected product details here
  page = 1;
  pageSize = 10;
  isAppliedFilters = false;
  userRole = ''
  categories: any[] = [];
  selectedCategory: any;
  isLogedIn: boolean = false;
  isCloseModal: boolean = false
  price:any = 1000;
  allProducts: any[]= [];
  isCartOpen: boolean = false;
  constructor(private http: HttpClient, private dialog: MatDialog, private productService: ProductService,
    private authService: AuthenticationService, private CategoryService: CategoryService, private cartService: CartService
  ) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {

    this.checkUserRole();
    this.fetchProductList();


    this.authService.entityCount$.subscribe(async (entityCount) => {
      debugger
      console.log('Entity Count list Product component call ', entityCount)
      this.paginateProducts();
      if (entityCount.message === 'selected-category') {
        debugger
        console.log(entityCount.data)
        this.categories.forEach(cat => {
          if (cat.name === entityCount.data) {
            this.selectCategory(cat)
          }
        });

      }
      if (entityCount.message === 'selected-cart') {
        debugger
        console.log(entityCount.data)
        this.isCartOpen = entityCount.data

      }
      if (entityCount.message === 'selected-price') {
        debugger
        console.log(entityCount.data)
        this.price = entityCount.data 
        this.dataSource.data = this.allProducts.filter(item => item.price < this.price);
        debugger
        this.dataSource._updateChangeSubscription(); // this.dataSource.data = updatedDataArray;
      }
      // if (entityCount.message === 'selected-minprice') {
      //   debugger
      //   console.log(entityCount.data)
      //   this.price = entityCount.data 
      //   this.dataSource.data = this.allProducts.filter(item => item.price < this.price);
      //   debugger
      //   this.dataSource._updateChangeSubscription(); // this.dataSource.data = updatedDataArray;
      // }
      if (entityCount.message === 'selected-priceRange') {
        debugger
        console.log(entityCount.data)
        const minPrice = entityCount.data.maxPrice
        const maxPrice = entityCount.data.minPrice
        this.dataSource.data = this.allProducts.filter((item: any) => {
          // Check if any of the conditions match using OR operator (||)
          return (
            item.price < maxPrice &&
            item.price > minPrice
          );
        });
        debugger
        this.dataSource._updateChangeSubscription(); // this.dataSource.data = updatedDataArray;
      }
      if (entityCount.message === 'selected-sort') {
        debugger
        console.log(entityCount.data)
        const sortType = entityCount.data 
        this.pagedProducts 
        = await this.sortProducts(sortType)
        debugger
        this.dataSource._updateChangeSubscription();      
      }
      if (entityCount.message === 'selected-search') {
        debugger
        console.log(entityCount.data)
        const searchTerm = entityCount.data 
        debugger
        this.dataSource.data = this.allProducts.filter((item: any) => {
          // Check if any of the conditions match using OR operator (||)
          return (
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.price < parseInt(searchTerm,10) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase())
          );
        });
        debugger
        this.dataSource._updateChangeSubscription(); // this.dataSource.data = updatedDataArray;


      }
      
      // this.entityCount = entityCount;
    });
  }
  appliedFilters() {
    return !!this.filters.length()
  }

  fetchProductList(): void {
    this.productService.getProducts().subscribe(
      (response: any[]) => {
        this.dataSource.data = response; // Assign the fetched data to dataSource
        console.log(this.dataSource.data)
        this.allProducts = this.dataSource.data
        debugger
        // this.authService.dothat({ name: 'products', count: this.dataSource.data.length })
        this.fetchCategories();

      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );

  }


  async  sortProducts(sortType: string) {
    try {
      // Assuming this is an asynchronous operation to fetch products
  
      // Sort the products based on price
      const sortedProducts = this.allProducts.slice().sort((a: any, b: any) => {
        if (sortType === 'asc') {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
  
      // Use the sorted products
      console.log(sortedProducts);
      return sortedProducts;
    } catch (error) {
      // Handle errors here
      console.error(error);
      return [];
    }
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

      if (result) {
        this.dataSource.data.unshift(result); // Append newObj to
      }
      // this.authService.dothat({ name: 'products', count: this.dataSource.data.length })
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
              // this.authService.dothat({ name: 'products', count: this.dataSource.data.length })
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
        this.dataSource._updateChangeSubscription();
      });
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
    debugger
    this.cartService.setCartItems(product)
    this.cartService.setToCart({ product: product, source: 'list-products' });
    this.openProductDetailsModal = false
    this.isCloseModal = true

  }
  fetchCategories(): void {
    // Make an API call to fetch categories
    debugger
    this.CategoryService.getCategorys().subscribe(
      (response: any) => {
        this.categories = response;
        debugger
        const categoryCounts = this.countCategories(this.dataSource.data);
        console.log('categoryCounts : ', categoryCounts);
        console.log('products data', this.dataSource.data.length)
        console.log('products all data', this.allProducts.length)
        const maxPriceProduct = this.allProducts.reduce((maxProduct, currentProduct) => {
          return currentProduct.price > maxProduct.price ? currentProduct : maxProduct;
        }, this.allProducts[0]);
debugger
        this.authService.dothat({ message: 'cat-count-list', maxPrice: maxPriceProduct.price, data: categoryCounts })

        debugger
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  countCategories(data: any) {
    const categoryCount: any = [];
    // Assuming there's a nested property 'nestedList' containing an array of objects
   let count = 0

    this.categories.forEach((category) => {
       count = 0
      data.forEach((item: any) => {
        const categoryName = item.category.name;
        if (category.name.toLowerCase() === categoryName.toLowerCase()) {
          count++
        }
      });
      // categoryCount.push({cat: {name: category.name,count:count }})
      categoryCount.push({ name: category.name, count: count })

    });
    debugger

    return Object.keys(categoryCount).map((key) => ({ [key]: categoryCount[key] }));
  }



  fetchProductsByCategory(categoryId: number | string): void {
    // Make an API call to fetch products based on the selected category
    this.CategoryService.getProductsByCategory(categoryId).subscribe(
      (response: any) => {
        debugger
        // Update the products data based on the selected category
        this.pagedProducts = response;
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
  checkUserRole() {
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
    const doubledNumbers = [].map((number) => {
      return number * 2;
    });
    [].filter(num => num % 2 === 0);
  }
}

