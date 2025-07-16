import type { SorterResult } from 'antd/es/table/interface';
import type {
    Company,
    FilterResult,
    Product,
    ProductsResponse
} from '../types';
import { axiosInstance } from './axios';
import { isSorterArray } from './utils';
import dayjs from 'dayjs';

export async function getProductsTotalAmount(
    company: Company
): Promise<number> {
    const response = await axiosInstance.get(`/products/${company}`, {
        params: { pageNumber: 1, pageSize: 1 }
    });

    const data = response.data as ProductsResponse;
    return data.totalCount;
}

function getProductSortParam<TDataType>(sorter?: SorterResult<TDataType>) {
    const order = sorter?.order === 'descend' ? 'desc' : 'asc';
    const field = sorter?.field;
    return order && field ? `${field}:${order}` : undefined;
}

function getProductFilterParam(filter?: FilterResult) {
    if (!filter) {
        return;
    }

    return Object.keys(filter)
        .map(fieldName => {
            const field = filter[fieldName];
            const query = field?.at(0);
            return field && query ? `${fieldName}:${query}` : null;
        })
        .filter((paramStr): paramStr is string => Boolean(paramStr))
        .join(',');
}

export async function getProducts<TDataType>(
    company: Company,
    pageNumber: number,
    pageSize: number,
    filter?: FilterResult,
    sorter?: SorterResult<TDataType> | SorterResult<TDataType>[]
): Promise<{ products: Product[]; total: number }> {
    const filterBy = getProductFilterParam(filter);
    const sortBy = isSorterArray(sorter)
        ? sorter.map(getProductSortParam).join(',')
        : getProductSortParam(sorter);

    const response = await axiosInstance.get(`/products/${company}`, {
        params: { pageNumber, pageSize, sortBy, filterBy }
    });

    const data = response.data as ProductsResponse;
    return { products: data.products, total: data.totalCount };
}

export function isProductNew(changedAt?: number) {
    const hours = Number(import.meta.env.VITE_PRICE_LOOKBACK_HOURS);

    if (!changedAt || !hours || isNaN(hours)) {
        return false;
    }

    const changedAtDate = dayjs.unix(changedAt);
    const cutoff = dayjs().subtract(hours, 'hour');

    return changedAtDate.isAfter(cutoff);
}
