import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { finalize } from 'rxjs';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css'
})
export class AdminProductsComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly productService = inject(ProductService);

  products: Product[] = [];
  loading = false;
  saving = false;
  errorMessage = '';
  successMessage = '';
  editingId: string | null = null;
  searchTerm = '';

  readonly productForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    description: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    category: ['', Validators.required],
    image: [''],
    stock: [0, [Validators.required, Validators.min(0)]]
  });

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.errorMessage = '';

    this.productService.getProducts(this.searchTerm)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: response => {
          this.products = response.data ?? [];
        },
        error: error => {
          this.errorMessage =
            error?.error?.message ||
            error?.error?.msg ||
            'Could not load products.';
        }
      });
  }

  search(): void {
    this.loadProducts();
  }

  resetSearch(): void {
    this.searchTerm = '';
    this.loadProducts();
  }

  startCreate(): void {
    this.editingId = null;
    this.successMessage = '';
    this.errorMessage = '';
    this.productForm.reset({
      name: '',
      description: '',
      price: 0,
      category: '',
      image: '',
      stock: 0
    });
  }

  startEdit(product: Product): void {
    if (!product._id) {
      return;
    }

    this.editingId = product._id;
    this.successMessage = '';
    this.errorMessage = '';

    this.productForm.patchValue({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image ?? '',
      stock: product.stock
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelEdit(): void {
    this.startCreate();
  }

  saveProduct(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.errorMessage = '';
    this.successMessage = '';

    const product = this.productForm.getRawValue();

    const request$ = this.editingId
      ? this.productService.updateProduct(this.editingId, product)
      : this.productService.createProduct(product);

    request$
      .pipe(finalize(() => this.saving = false))
      .subscribe({
        next: () => {
          this.successMessage = this.editingId
            ? 'Product updated successfully.'
            : 'Product created successfully.';

          this.startCreate();
          this.loadProducts();
        },
        error: error => {
          this.errorMessage =
            error?.error?.message ||
            error?.error?.msg ||
            'Could not save product. Make sure you are logged in.';
        }
      });
  }

  deleteProduct(product: Product): void {
    if (!product._id) {
      return;
    }

    const confirmed = window.confirm(
      `Delete "${product.name}"? This action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';

    this.productService.deleteProduct(product._id).subscribe({
      next: () => {
        this.successMessage = 'Product deleted successfully.';
        this.loadProducts();
      },
      error: error => {
        this.errorMessage =
          error?.error?.message ||
          error?.error?.msg ||
          'Could not delete product. Make sure you are logged in.';
      }
    });
  }

  fieldInvalid(fieldName: string): boolean {
    const field = this.productForm.get(fieldName);
    return !!field && field.invalid && field.touched;
  }
}
