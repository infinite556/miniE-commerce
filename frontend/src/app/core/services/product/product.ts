import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = '/api/products'; 

  constructor(private http: HttpClient) { }


  getProducts(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getProductById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // adding a product need token
  createProduct(productData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(this.baseUrl, productData, { headers });
  }

  // updating needs token
  updateProduct(id: string, productData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.baseUrl}/${id}`, productData, { headers });
  }

  // also needs token
  deleteProduct(id: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.baseUrl}/${id}`, { headers });
  }

  // دالة مساعدة بتجيب التوكن من المتصفح وتبعته مع الطلب
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });
  }
}