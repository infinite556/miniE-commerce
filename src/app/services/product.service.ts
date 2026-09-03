import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Product,
  ProductResponse,
  ProductsResponse
} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/v1/products';

  private authHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    return token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();
  }

  getProducts(search = '', category = ''): Observable<ProductsResponse> {
    let params = new HttpParams();

    if (search.trim()) {
      params = params.set('search', search.trim());
    }

    if (category.trim()) {
      params = params.set('category', category.trim());
    }

    return this.http.get<ProductsResponse>(this.apiUrl, { params });
  }

  getProduct(id: string): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: Product): Observable<ProductResponse> {
    return this.http.post<ProductResponse>(
      this.apiUrl,
      product,
      { headers: this.authHeaders() }
    );
  }

  updateProduct(id: string, product: Partial<Product>): Observable<ProductResponse> {
    return this.http.put<ProductResponse>(
      `${this.apiUrl}/${id}`,
      product,
      { headers: this.authHeaders() }
    );
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`,
      { headers: this.authHeaders() }
    );
  }
}
