import type { SorterResult, FilterValue } from 'antd/es/table/interface';

export type PriceData = {
    price?: number;
    changedAt?: number;
};

export type Product = {
    ean: string;
    companyId: number;
    name?: string;
    category?: string;
    imageUrl?: string;
    url?: string;
    price?: number;
    changedAt?: number;
    prices: PriceData[];
};

export type Company = 'castorama';

export type ProductsResponse = {
    products: Product[];
    pageSize: number;
    pageNumber: number;
    totalCount: number;
    hasNextPage: boolean;
};

export type FilterResult = Record<string, FilterValue | null>;
