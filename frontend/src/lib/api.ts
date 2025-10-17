import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  image: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export const productApi = {
  // Get all products
  getAll: async (): Promise<ApiResponse<Product[]>> => {
    const response = await apiClient.get('/products');
    return response.data;
  },

  // Get single product
  getById: async (id: number): Promise<ApiResponse<Product>> => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },

  // Create product
  create: async (formData: FormData): Promise<ApiResponse<Product>> => {
    const response = await apiClient.post('/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update product
  update: async (id: number, formData: FormData): Promise<ApiResponse<Product>> => {
    // Laravel doesn't support PUT with multipart/form-data, so we use POST with _method
    formData.append('_method', 'PUT');
    const response = await apiClient.post(`/products/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete product
  delete: async (id: number): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete(`/products/${id}`);
    return response.data;
  },
};
