import type { Company, Product, ProductsResponse } from '../types';
import { axiosInstance } from './axios';

export async function getProductsTotalAmount(
    company: Company
): Promise<number> {
    const response = await axiosInstance.get(`/products/${company}`, {
        params: { pageNumber: 1, pageSize: 1 }
    });

    const data = response.data as ProductsResponse;
    return data.totalCount;
}

export async function getProducts(
    company: Company,
    pageNumber: number,
    pageSize: number
): Promise<Product[]> {
    const response = await axiosInstance.get(`/products/${company}`, {
        params: { pageNumber, pageSize }
    });

    const data = response.data as ProductsResponse;
    return data.products;
}
