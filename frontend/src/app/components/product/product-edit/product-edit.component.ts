import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  @Input() viewMode = false;
  @Input() currentProduct:any = {
    name: '',
    price: ''
  };
  submitted = false;
  constructor(
    private formBuilder: FormBuilder, 
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router) { }
    
    ngOnInit(): void {
      if (!this.viewMode) {
        this.getProduct(this.route.snapshot.params["id"]);
      }
    
    this.getProduct(this.route.snapshot.paramMap.get('id'));
  }
  getProduct(id: any): void {
    this.productService.get(id)
      .subscribe(
        data => {
          this.currentProduct = data;
          console.log(data);
        }
      )}
  onSubmit(): void {
    this.submitted = true
    this.productService.update(this.currentProduct.id, this.currentProduct)
      .subscribe({
        next: (res) => {
          console.log(res);
          
        window.location.href = "/products"
        },
        error: (e) => console.error(e)
      });
  }
    
}
