import { Flex, Table } from 'antd';
import type { TablePaginationConfig, TableProps } from 'antd';
import dayjs from 'dayjs';
import type { PriceData, Product } from '../types';
import { useProducts } from '../hooks/useProducts';
import { Thumbnail } from './Thumbnail';
import { PriceIndicator } from './PriceIndicator';
import { useState } from 'react';

type DataType = {
    key: string;
} & Product;

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Miniatura',
        dataIndex: 'imageUrl',
        key: 'imageUrl',
        align: 'center',
        ellipsis: false,
        render: imgUrl => (
            <Flex justify="center">
                <Thumbnail imageUrl={imgUrl} sizePx={50} />
            </Flex>
        )
    },
    {
        title: 'EAN',
        dataIndex: 'ean',
        key: 'ean'
    },
    {
        title: 'Kategoria',
        dataIndex: 'category',
        key: 'category'
    },
    {
        title: 'Producent',
        dataIndex: 'brandName',
        key: 'brandName'
    },
    {
        title: 'Nazwa',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Data aktualizacji',
        dataIndex: 'prices',
        key: 'changeTimestamp',
        render: (prices: Required<PriceData>) =>
            dayjs.unix(prices.changeTimestamp).format('DD.MM.YYYY')
    },
    {
        title: 'Aktualna cena',
        dataIndex: 'prices',
        key: 'currentPrice',
        render: (prices: Required<PriceData>) => (
            <PriceIndicator
                oldPrice={prices.prevPrice}
                newPrice={prices.price}
            />
        )
    }
];

function filterUndefinedValues(product: Product): product is Required<Product> {
    const isValid = (obj: Product | PriceData) =>
        Object.values(obj).every(value => value !== undefined);

    return isValid(product) && isValid(product.prices);
}

function getRowsFromProducts(products: Product[]): DataType[] {
    return products.filter(filterUndefinedValues).map(product => ({
        ...product,
        key: product.ean
    }));
}

type Pagination = {
    pageSize: number;
    pageNumber: number;
};

export function ProductTable() {
    const [pagination, setPagination] = useState<Pagination>({
        pageSize: 1,
        pageNumber: 10
    });

    const { products } = useProducts(
        pagination.pageNumber,
        pagination.pageSize
    );

    const handleTableChange: TableProps<DataType>['onChange'] = ({
        current,
        pageSize
    }) => {
        setPagination({ pageNumber: current, pageSize });
    };

    return (
        <div
            style={{
                padding: '16px'
                //boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'
            }}
        >
            <Table<DataType>
                size="small"
                columns={columns}
                dataSource={getRowsFromProducts(products)}
                onChange={handleTableChange}
            />
        </div>
    );
}
