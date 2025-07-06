import { Empty, Flex, Table } from 'antd';
import dayjs from 'dayjs';
import type { TableProps } from 'antd';
import type { PriceData, Product } from '../types';
import { useProducts } from '../hooks/useProducts';
import { Thumbnail } from './Thumbnail';
import { PriceIndicator } from './PriceIndicator';

type DataType = {
    key: string;
} & Product;

function filterUndefinedValues(product: Product): product is Required<Product> {
    const isValid = (obj: Product | PriceData) =>
        Object.values(obj).every(value => value !== undefined);

    return isValid(product) && product.prices.every(isValid);
}

function getRowsFromProducts(products: Product[]): DataType[] {
    return products.filter(filterUndefinedValues).map(product => ({
        ...product,
        key: product.ean
    }));
}

function getLastPrices(prices: Required<PriceData>[]): {
    current: Required<PriceData> | null;
    prev: Required<PriceData> | null;
} {
    if (prices.length === 0) {
        return { current: null, prev: null };
    }

    const sortedPrices = [...prices].sort((a, b) => b.changedAt - a.changedAt);

    return {
        current: sortedPrices[0],
        //prev: sortedPrices.length > 1 ? sortedPrices[1] : null
        prev: { changedAt: dayjs(0).unix(), price: 100 }
    };
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Miniatura',
        dataIndex: 'imageUrl',
        width: '10%',
        key: 'imageUrl',
        align: 'center',
        render: imgUrl => (
            <Flex justify='center'>
                <Thumbnail imageUrl={imgUrl} sizePx={80} />
            </Flex>
        )
    },
    {
        title: 'Nazwa',
        dataIndex: 'name',
        key: 'name',
        width: '30%'
    },
    {
        title: 'EAN',
        dataIndex: 'ean',
        key: 'ean',
        width: '12%'
    },
    {
        title: 'Kategoria',
        dataIndex: 'category',
        key: 'category',
        width: '20%'
    },
    {
        title: 'Data aktualizacji',
        dataIndex: 'prices',
        key: 'prices',
        width: 200,
        render: (prices: Required<PriceData>[]) => {
            const lastPrices = getLastPrices(prices);
            return lastPrices.current
                ? dayjs.unix(lastPrices.current.changedAt).format('DD.MM.YYYY')
                : 'Brak danych.';
        }
    },
    {
        title: 'Aktualna cena',
        dataIndex: 'prices',
        key: 'prices',
        width: 160,
        fixed: 'right',
        render: (prices: Required<PriceData>[]) => {
            const { current, prev } = getLastPrices(prices);
            return current ? (
                <PriceIndicator
                    prevPrice={prev?.price}
                    currentPrice={current.price}
                />
            ) : (
                'Brak danych.'
            );
        }
    }
];

export function ProductTable() {
    const { products, pagination } = useProducts('castorama');

    const handleTableChange: TableProps<DataType>['onChange'] = tablePage => {
        pagination.setPageNumber(tablePage.current);
        pagination.setPageSize(tablePage.pageSize);
    };

    return (
        <div className='p-4'>
            {products.error ? (
                <Empty
                    className='p-8'
                    description='Wystąpił błąd przy pobieraniu produktów.'
                />
            ) : (
                <Table<DataType>
                    size='small'
                    loading={products.loading}
                    locale={{
                        emptyText: () =>
                            !products.loading && (
                                <Empty
                                    description='Brak danych.'
                                    className='p-8'
                                />
                            )
                    }}
                    columns={columns}
                    pagination={{
                        current: pagination.pageNumber,
                        pageSize: pagination.pageSize,
                        total: pagination.total,
                        locale: { items_per_page: ' / strona' }
                    }}
                    expandable={{
                        expandedRowRender: () => <div>ceny</div>
                    }}
                    dataSource={getRowsFromProducts(products.data)}
                    onChange={handleTableChange}
                    scroll={{ y: 'calc(100vh - 208px)', x: 'max-content' }}
                />
            )}
        </div>
    );
}
