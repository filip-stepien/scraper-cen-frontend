import { useState, useEffect } from 'react';
import type { Company, FilterResult, Product } from '../types';
import { getProducts } from '../lib/products';
import { AxiosError } from 'axios';
import type { SorterResult } from 'antd/es/table/interface';

export function useProducts<TDataType>(
    company: Company,
    externalFilters?: FilterResult
) {
    const [products, setProducts] = useState<Product[]>([]);
    const [pageNumber, setPageNumber] = useState<number>();
    const [pageSize, setPageSize] = useState<number>();
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [filters, setFilters] = useState<FilterResult | undefined>(
        externalFilters
    );
    const [sorters, setSorters] = useState<
        SorterResult<TDataType> | SorterResult<TDataType>[]
    >();

    useEffect(() => {
        const fetchProductsData = async () => {
            const defaultPagination = {
                pageNumber: 1,
                pageSize: 10
            };

            setLoading(true);
            setError(false);

            try {
                const productsData = await getProducts(
                    company,
                    pageNumber ?? defaultPagination.pageNumber,
                    pageSize ?? defaultPagination.pageSize,
                    filters,
                    sorters
                );

                setTotal(productsData.total);
                setProducts(productsData.products);
            } catch (err) {
                if (err instanceof Error) {
                    console.error(err.message);
                }

                if (err instanceof AxiosError) {
                    setError(err.status !== 404);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProductsData();
    }, [pageNumber, pageSize, sorters, filters, company]);

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
        },
        aggregation: {
            setSorters,
            setFilters
        }
    };
}
