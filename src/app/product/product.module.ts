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
import { EditProductComponent } from './edit-product/edit-product.component';




@NgModule({
  declarations: [
    ListProductComponent,
    AddProductComponent,
    EditProductComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ]
})
export class ProductModule { }
