import { useState, useEffect } from 'react';
import type { Company, Product } from '../types';
import { getProducts, getProductsTotalAmount } from '../lib/products';

export function useProducts(company: Company) {
    const [products, setProducts] = useState<Product[]>([]);
    const [pageNumber, setPageNumber] = useState<number>();
    const [pageSize, setPageSize] = useState<number>();
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchProductsData = async () => {
            const defaultPagination = {
                pageNumber: 1,
                pageSize: 10
            };

            setLoading(true);
            setError(false);

            try {
                const fetchedTotal = await getProductsTotalAmount(company);
                const fetchedProducts = await getProducts(
                    company,
                    pageNumber ?? defaultPagination.pageNumber,
                    pageSize ?? defaultPagination.pageSize
                );

                setTotal(fetchedTotal);
                setProducts(fetchedProducts);
            } catch (err) {
                if (err instanceof Error) {
                    console.error(err.message);
                }
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchProductsData();
    }, [pageNumber, pageSize, company]);

    return {
        pagination: {
            pageNumber,
            pageSize,
            total,
            setPageNumber,
            setPageSize
        },
        products: {
            data: products,
            loading,
            error
        }
    };
}
