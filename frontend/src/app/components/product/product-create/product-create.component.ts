import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, AbstractControl} from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(0)
  });
  submitted = false;
  constructor(private formBuilder: FormBuilder, private productService: ProductService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        name: '',
        price:''
      },
      {
      }
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const data = this.form.value
    this.productService.create(data)
    .subscribe(
      response => {
        console.log(response);
        this.submitted = true;
        window.location.href = "/products"
        }
      )
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

}
