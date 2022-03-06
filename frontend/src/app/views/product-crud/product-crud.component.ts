import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrls: ['./product-crud.component.css']
})
export class ProductCrudComponent implements OnInit {
  products:any;
  displayedColumns = ['name', 'price', 'action'];
  dataSource = this.productService.getAll();
  constructor(private productService:ProductService) { }
  ngOnInit(): void {
    this.retrieveProducts();
  }
  retrieveProducts(): void {
    this.productService.getAll()
    .subscribe(
      data => {
        this.products = data;
        console.log(data);
      }
     
    )

}
}