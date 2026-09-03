export interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  stock: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductsResponse {
  status: string;
  results: number;
  data: Product[];
}

export interface ProductResponse {
  status: string;
  data: Product;
}
