

import { Router } from '@angular/router';
import { AuthenticationService } from '../../shared/services/auth-service.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from '../../shared/services//cart.service';


@Component({
  selector: 'app-customer-layout',
  templateUrl: './customer-layout.component.html',
  styleUrls: ['./customer-layout.component.scss']
})
export class CustomerLayoutComponent {

  @Input() parentData: string = '';
  @Output() childEvent = new EventEmitter<string>();
  parentDataa = '';
  do: any;
  list: any = [];

  showPriceFilter = false
  showCategoryFilter = false
  boolArray: boolean[]= [];
  isShopSelected= false;


  sendDataToParent() {
    this.childEvent.emit('Data from Child');
  }
  userRole = ''

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
  ) { }
  cartItems: any[] = [];

  ngOnInit() {
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
      if (cartItem.name !== '')
        this.cartItems.push(cartItem)
      // this.cartItems = this.cartItems.filter(item => item.count !== 0 || item.name.trim() !== '');
      this.cartService.setItems(this.cartItems)

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

  clickShop() {
    this.isShopSelected = true
  }
  clickHome() {
    this.isShopSelected = false
  }
  clickCategory(data: any, index: number) {
    this.authService.dothat({ message: 'selected-category', data: data })
    this.updateIndexTrue(index)
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
}
