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
