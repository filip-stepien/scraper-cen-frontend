import { useState, useEffect } from 'react';
import type { Product } from '../types';
import { getProducts } from '../lib/products';

export function useProducts(pageNumber: number, pageSize: number) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(false);

            try {
                const fetchedProducts = await getProducts(pageNumber, pageSize);
                setProducts(fetchedProducts);
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [pageNumber, pageSize]);

    return {
        products,
        loading,
        error,
        pageNumber,
        pageSize
    };
}
