import type { Product } from '../types';

export async function getProducts(
    pageNumber: number,
    pageSize: number
): Promise<Product[]> {
    const products: Product[] = [
        {
            imageUrl: 'https://picsum.photos/800/800?random=1',
            category: 'pageNumber: ' + pageNumber,
            brandName: 'pageSize: ' + pageSize,
            ean: '6451302110091',
            name: 'Product 1',
            prices: {
                price: 74.7,
                prevPrice: 119.7,
                changeTimestamp: 1751062292
            }
        },
        {
            imageUrl: 'https://picsum.photos/800/800?random=2',
            category: 'Kategoria 2',
            brandName: 'Brand 2',
            ean: '7127998383281',
            name: 'Product 2',
            prices: {
                price: 97.87,
                prevPrice: 97.87,
                changeTimestamp: 1751558494
            }
        },
        {
            imageUrl: 'https://picsum.photos/800/800?random=3',
            category: 'Kategoria 3',
            brandName: 'Brand 3',
            ean: '4186212809612',
            name: 'Product 3',
            prices: {
                price: 11.27,
                prevPrice: 67.78,
                changeTimestamp: 1750647275
            }
        },
        {
            imageUrl: 'https://picsum.photos/800/800?random=4',
            category: 'Kategoria 4',
            brandName: 'Brand 4',
            ean: '7282427045229',
            name: 'Product 4',
            prices: {
                price: 83.98,
                prevPrice: 85.49,
                changeTimestamp: 1751561033
            }
        },
        {
            imageUrl: 'https://picsum.photos/800/800?random=5',
            category: 'Kategoria 5',
            brandName: 'Brand 5',
            ean: '2622769344840',
            name: 'Product 5',
            prices: {
                price: 197.93,
                prevPrice: 41.15,
                changeTimestamp: 1751482107
            }
        }
    ];
    return [...products, ...products, ...products, ...products, ...products];
}
