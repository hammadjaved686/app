import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css'],
})
export class ListProductComponent implements OnInit {
  dataSource = new MatTableDataSource<any>(); // Change 'any' to your ProductModel type
  displayedColumns: string[] = ['id', 'title', 'price', 'description', 'category', 'images', 'actions'];

  constructor(private http: HttpClient) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.fetchProductList();
  }

  fetchProductList(): void {
    this.http.get<any[]>('https://api.escuelajs.co/api/v1/products').subscribe(
      (response: any[]) => {
        this.dataSource.data = response; // Assign the fetched data to dataSource
        console.log(this.dataSource.data)
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator; // Set paginator for the MatTableDataSource
  }
}
