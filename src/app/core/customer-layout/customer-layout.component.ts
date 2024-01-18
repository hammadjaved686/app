

import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../../shared/services/auth-service.service';
import { Component, Input, Output, EventEmitter, OnInit,Renderer2, OnDestroy, ElementRef, ViewChild} from '@angular/core';
import { CartService } from '../../shared/services//cart.service';
// import { CartService } from '../../../assets/images/';
import { MatSliderModule } from '@angular/material/slider';


import { interval, Subscription } from 'rxjs';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-layout',
  templateUrl: './customer-layout.component.html',
  styleUrls: ['./customer-layout.component.scss']
})
export class CustomerLayoutComponent {
  @ViewChild('cartImage') cartImageElement!: ElementRef;
  @ViewChild('slider')
  slider!: ElementRef;
  @ViewChild('startInput')
  startInput!: ElementRef;
  @ViewChild('endInput')
  endInput!: ElementRef;
  @Input() parentData: string = '';
  @Output() childEvent = new EventEmitter<string>();
  parentDataa = '';
  do: any;
  path: string = '../../assets/images/cart1.jpg'; // Make sure to initialize properly
  list: any = [];
  minPrice: number = 100; // Default min price
  maxPrice: number = 1000; // Default max price
  showCartDropdown: boolean = false;
  imagePaths: string[] = [
    '../../assets/images/cart1.jpg',
    '../../assets/images/cart2.jpg',
    '../../assets/images/cart3.jpg',
    '../../assets/images/cart4.jpg',
    '../../assets/images/cart5.jpg',
    '../../assets/images/cart6.jpg',
    '../../assets/images/cart7.jpg',
    '../../assets/images/cart8.jpg',
    // Add more paths as needed
  ];
  currentImagePathIndex: number = 0;
  private updateSubscription: Subscription | undefined;

  startVal = 0
  endVal = 10000
  showPriceFilter = false
  showCategoryFilter = false
  boolArray: boolean[]= [];
  isShopSelected= false;
  isVendorSelected= false;
  isBlogSelected= false;
  isContactsSelected= false;
  isHomeSelected= false;
  isCartOpen: boolean = false;
  wishList: any = [];
  orderByPrice: string = 'asc'; // Default order by price (ascending)

  priceRange: number[] = [300, 400]; // Default price range

  sendDataToParent() {
    this.childEvent.emit('Data from Child');
  }
  userRole = ''
  searchTerm: string = '';
  isAuthenticated: boolean = false; // Flag to track authentication status
  sidnav: { [key: string]: boolean } = {
    users: false,
    category: false,
    products: false,
  };
  isCategory: boolean = false; // Flag to track authentication status
  isUser: boolean = false; // Flag to track authentication status
  isProduct: boolean = false; // Flag to track authentication status
  productCount: number = 0; // Flag to track authentication status
  showParent = false;
  constructor(public router: Router,
    private authService: AuthenticationService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private dialog: MatDialog,
  ) { }
  cartItems: any[] = [];

  ngOnInit() {

    // for image counter
    // this.getFavourites()

    let state = this.cartService.getHeaderState()
    this.isShopSelected = state[0]
    debugger
    this.isVendorSelected= state[1];
    this.isBlogSelected= state[2];
    this.isContactsSelected= state[3];
    this.isHomeSelected= state[4];
    this.cartItems = this.cartService.getCartItems()

    const storedUserRole = localStorage.getItem('userRole');
    if (storedUserRole !== null) {
      this.userRole = storedUserRole;
    }
    // Subscribe to isAuthenticated$ to react to changes in authentication status
    this.parentDataa = this.parentData;
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      debugger
      console.log('header component call ', isAuthenticated)
      this.isAuthenticated = isAuthenticated;
      // You can perform actions based on the authentication status here...
    });

    this.cartService.cartCount$.subscribe((cartItemRec) => {
      debugger
      console.log('Entity Cart ------ component call ', cartItemRec)
      // product-details
      const cartItem = cartItemRec.product
      if (cartItem?.name !== '')
      debugger
      this.cartItems = this.cartService.getItems()
          if(cartItem && this.router.url!=='/cart'){
            this.cartItems.push(cartItem)

          }
          this.cartItems = this.cartService.getCartItems()

      // this.cartItems = this.cartItems.filter(item => item.count !== 0 || item.name.trim() !== '');
      // this.cartService.setItems(this.cartItems)

      console.log('Entity Cart Items------ component call ', this.cartItems)

      // this.productCount = entityCount.count
      // this.childEvent.emit(`Data from Child Products Count ${entityCount.count}` );

      // this.entityCount = entityCount;
    });
    this.authService.entityCount$.subscribe((entityCount) => {
      debugger
      console.log('------------------- :', entityCount)
      // this.productCount = entityCount.count
      if (entityCount.message === 'cat-count-list') {
       this.endValue = this.maxPrice = entityCount.maxPrice
        debugger
        console.log(entityCount.data)
        this.items[0].content =
          this.do = entityCount.data
        debugger
        this.boolArray = new Array(this.items[0].content.length).fill(false);

        console.log('items cats : ', this.items[0].content)
        this.do.forEach((number: any, index: number = 0) => {
          console.log('number : --- ', number[index].name);
          index++
        });
      }



      debugger
      // this.childEvent.emit(`Data from Child Products Count ${entityCount.count}` );

      // this.entityCount = entityCount;
    });
  }

  search() {
    // Implement search logic here using this.searchTerm
    console.log('Searching for:', this.searchTerm);
    this.authService.dothat({ message: 'selected-search', data: this.searchTerm })
  }

  onOrderByPriceChange() {
    this.authService.dothat({ message: 'selected-sort', data: this.orderByPrice })
  }
  startValue: number = 1;
  endValue: number = 10000;

  updateRange() {
    console.log(`Start value: ${this.startValue}, End value: ${this.endValue}`);
    this.authService.dothat({ message: 'selected-priceRange', data: {maxPrice:this.startValue, minPrice: this.endValue }})

    // Perform actions with updated values here
  }



  setImageSource(): void {
    // Assuming you have the image source in a variable called imagePath
    const imagePath = './../assets/images/cart8.jpg';

  }

  getFavourites() {
    const storedItems = localStorage.getItem('wishList');

    if (storedItems) {
      this.wishList = JSON.parse(storedItems).filter((item: any) => item !== undefined);
      console.log('wishList : -- -- - --- ', this.wishList)
    }
  }
  goToWishList(){
    const wishList = this.cartService.getWishlist();
    if(wishList.length===0)
    {
      this.openDialog('WishLish is Empty')
      return
    }
      
    this.router.navigate(['wishlist'])
  }
  ngOnDestroy() {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }

  getCurrentImagePath(): any {
    console.log('currennt Image path : ', this.imagePaths[this.currentImagePathIndex] )
    const randomIndex = Math.floor(Math.random() * this.imagePaths.length);
    if (this.cartImageElement) {
      this.cartImageElement.nativeElement.src = this.imagePaths[randomIndex];
    }
    return this.imagePaths[randomIndex];
  }
  clickShop() {
    const currentRoute =  this.router.url;
    if (currentRoute !== '/shop') {
      this.router.navigate(['/shop'])
    }
    this.isShopSelected = true
    debugger
    this.isVendorSelected= false;
    this.isBlogSelected= false;
    this.isContactsSelected= false;
    this.isHomeSelected= false;

    this.cartService.setHeaderState([true,false,false,false,false,false])

  }

  clickBlog() {
    const currentRoute =  this.router.url;
    if (currentRoute !== '/blog') {
      this.router.navigate(['/blog'])
    }
    this.isShopSelected = false
    this.isVendorSelected= false;
    this.isBlogSelected= true;
    this.isContactsSelected= false;
    this.isHomeSelected= false;
    this.cartService.setHeaderState([false,false,true,false,false])

  }

  getCurrentPath(){
    console.log('--------+++++++++____________+++++++++')
   return '../../assets/images/cart1.jpg'
  }
  clickContacts() {
    const currentRoute =  this.router.url;
    if (currentRoute !== '/contacts') {
      this.router.navigate(['/contacts'])
    }
    this.isShopSelected = false
    this.isVendorSelected= false;
    this.isBlogSelected= false;
    this.isContactsSelected= true;
    this.isHomeSelected= false;
    this.cartService.setHeaderState([false,false,false,true,false])

  }
  clickVendor() {
    const currentRoute =  this.router.url;
    if (currentRoute !== '/Vendor') {
      this.router.navigate(['/Vendor'])
    }
    this.isShopSelected = false
    this.isVendorSelected= true;
    this.isBlogSelected= false;
    this.isContactsSelected= false;
    this.isHomeSelected= false;
  }
  clickHome() {
    const currentRoute =  this.router.url;
    debugger
    if (currentRoute !== '/home') {
      this.router.navigate(['/home'])
    }
    this.isShopSelected = false
    this.isVendorSelected= false;
    this.isBlogSelected= false;
    this.isContactsSelected= false;
    this.isHomeSelected= true;
    this.cartService.setHeaderState([false,false,false,false,true])

  }
  clickCategory(data: any, index: number) {
    this.authService.dothat({ message: 'selected-category', data: data })
    this.updateIndexTrue(index)
  }
  openDialog(message:any): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px', // Set width or other properties as needed
      data: message // You can pass data to the dialog if needed
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      // Handle the result here if needed
     
    });
  }

  clickCart() {
    // this.isCartOpen = !this.isCartOpen
    this.cartItems = this.cartService.getCartItems()
    // this.authService.dothat({ message: 'selected-cart', data: this.isCartOpen })
    if(this.cartItems.length ===0){
      this.openDialog('Cart is Empty')
      return
    }
    this.router.navigate(['/cart'])
  }
  goToProducts() {
    this.showParent = false

    this.isProduct = true;
    this.isUser = false;
    this.isCategory = false

    this.router.navigateByUrl('/product')
  }
  items: any = [
    { header: 'Filter By Category', content: [{ name: 'da', count: 1 }] },
  ];
  prices: any = [
    { header: 'Filter By Price', content: [{ name: 'da', count: 1 }] },
  ];
  activeIndex: number = -1;

  toggleAccordion(index: number, filterType:string): void {
    if(filterType==='category') {
      this.showCategoryFilter = !this.showCategoryFilter
      this.showPriceFilter = false


    }
    else if(filterType==='price') {
      this.showPriceFilter = !this.showPriceFilter
      this.showCategoryFilter = false

    }
    if (this.activeIndex === index) {
      this.activeIndex = -1; // Collapse if clicked section is already open
    } else {
      this.activeIndex = index;
    }
  }
  updateIndexTrue(index: number): void {
    if (index >= 0 && index < this.boolArray.length) {
      this.boolArray.fill(false);
      debugger
      this.boolArray[index] = true;
    } else {
      throw new Error('Index out of bounds');
    }
  }
  login() {
    debugger
    // this.authService.doLogin();
  }
  logout() {
    debugger
    this.authService.doLogout()
    this.userRole = ''
  }
  goToUsers() {
    this.isUser = true
    this.isProduct = false
    this.isCategory = false
    this.router.navigateByUrl('/user')
    this.showParent = true
  }
  goToCategories() {
    this.showParent = false

    this.isUser = false
    this.isProduct = false
    this.isCategory = true
    this.router.navigateByUrl('/category')
  }
  onPriceChange(event: Event) {
    debugger
    const target = event.target as HTMLInputElement;
    const selectedPrice = parseInt(target.value, 10);
    const output = document.querySelector('.slider-value') as HTMLOutputElement;
    output.textContent = `$${selectedPrice}`;
    debugger
    // Call your function here using the selectedPrice value
    this.functionOnChange(selectedPrice);
  }

  functionOnChange(value: number) {
    // Do something with the changed value
    this.authService.dothat({ message: 'selected-price', data: value })

    console.log('Selected Price:', value);
  }

  priceRangeChange(event: Event) {
        const startValue = this.startInput.nativeElement.value;
        this.startValue = startValue
        const endValue = this.endInput.nativeElement.value;
        this.endValue = endValue
        this.authService.dothat({ message: 'selected-priceRange', data: {maxPrice: startValue, minPrice: endValue }})
  }

//   ngAfterViewInit(): void {
//     // Accessing the start and end thumb values
//     const startValue = parseInt(this.startInput.nativeElement.value, 10);
//     const endValue = parseInt(this.endInput.nativeElement.value, 10);

//     console.log('Start Value:', startValue);
//     console.log('End Value:', endValue);

//     // Example: Adding an event listener for value changes
//     this.renderer.listen(this.slider.nativeElement, 'input', () => {
//       const newStartValue = parseInt(this.startInput.nativeElement.value, 10);
//       const newEndValue = parseInt(this.endInput.nativeElement.value, 10);
// debugger
//       console.log('Updated Start Value:', newStartValue);
//       console.log('Updated End Value:', newEndValue);
//     });
//   }
}
