import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductComponent } from './list-product/list-product.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddProductComponent } from './add-product/add-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
// import { EditProductComponent } from './edit-product/edit-product.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { MyCapitalizePipe } from '../my-capitalize-pipe.pipe';
import { MyCustomDirective } from '../myCustomDirective.directive'; // Adjust the import path accordingly
import { MatCardModule } from '@angular/material/card';
import { ProductDetailsModalComponent } from './product-details-modal/product-details-modal.component';
import { CartComponent } from '../../app/shared/cart/cart.component'; // Import the app-cart component



@NgModule({
  declarations: [
    ListProductComponent,
    AddProductComponent,
    // EditProductComponent,
    MyCapitalizePipe,
    MyCustomDirective,
    ProductDetailsModalComponent,
    CartComponent

  ],
  imports: [
    CommonModule,
    MatIconModule,
    HttpClientModule,
    BrowserModule,
    FormsModule ,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class ProductModule { }
