export type PriceData = {
    price?: number;
    prevPrice?: number;
    changeTimestamp?: number;
};

export type Product = {
    category?: string;
    imageUrl?: string;
    brandName?: string;
    ean?: string;
    name?: string;
    prices: PriceData;
};
