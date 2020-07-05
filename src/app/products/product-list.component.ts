import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin = 2; //need not mention data type as we have typscript inference
  showImage: boolean = false;
  errorMessage: string;

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.products;
  }
  filteredProducts: IProduct[];
  // cannot filter our products array instead as it requires us to retreieve the data again
  // from the source.
  products: IProduct[] = [];

  constructor(private productService: ProductService) {
    // this.listFilter = '';
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLowerCase();
    return this.products.filter(
      (product: IProduct) =>
        product.productName.toLowerCase().indexOf(filterBy) !== -1
    );
  }

  toggleImage(): void {
    // ! -> Not operator
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      // this.products is an instance of class (Product List Component instance)
      next: (products) => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: (err) => (this.errorMessage = err),
    });
  }
}
