import { Empty, Flex, Table } from 'antd';
import dayjs from 'dayjs';
import type { TableProps } from 'antd';
import type { PriceData, Product } from '../types';
import { useProducts } from '../hooks/useProducts';
import { Thumbnail } from './Thumbnail';
import { PriceIndicator } from './PriceIndicator';
import { PriceChart } from './PriceChart';
import { useProductTableSearch } from '@/hooks/useProductTableSearch';

type DataType = {
    ean?: string;
    name?: string;
    category?: string;
    imageUrl?: string;
    url?: string;
    changedAt?: number;
    price?: number;
    prices?: PriceData[];
};

function filterUndefinedValues(product: Product): product is Required<Product> {
    const isValid = (obj: Product | PriceData) =>
        Object.values(obj).every(value => value !== undefined);

    return isValid(product) && product.prices.every(isValid);
}

function getRowsFromProducts(products: Product[]): DataType[] {
    const getRandomFloat = (min: number, max: number) =>
        Math.round(Math.random() * (max - min) + min);

    const getRandomTimestamp = () =>
        new Date(Math.random() * Date.now()).getTime();

    return products.filter(filterUndefinedValues).map(product => ({
        ...product,
        // DEBUG
        prices: new Array(20).fill(0).map(() => ({
            price: getRandomFloat(50, 150),
            changedAt: getRandomTimestamp()
        })),
        key: product.ean
    }));
}

function getLastPrices(prices: Required<PriceData>[]): {
    current: Required<PriceData> | null;
    prev: Required<PriceData> | null;
} {
    return prices.length === 0
        ? { current: null, prev: null }
        : {
              current: [...prices].sort((a, b) => b.changedAt - a.changedAt)[0],
              //prev: sortedPrices.length > 1 ? sortedPrices[1] : null
              prev: { changedAt: dayjs(0).unix(), price: 100 }
          };
}

export function ProductTable() {
    const { columnSearchProps } = useProductTableSearch<DataType>();
    const { products, pagination, aggregation } =
        useProducts<DataType>('castorama');

    const handleTableChange: TableProps<DataType>['onChange'] = (
        tablePage,
        tableFilters,
        sorters
    ) => {
        aggregation.setFilters(tableFilters);
        aggregation.setSorters(sorters);
        pagination.setPageNumber(tablePage.current);
        pagination.setPageSize(tablePage.pageSize);
    };

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Miniatura',
            dataIndex: 'imageUrl',
            width: '10%',
            key: 'imageUrl',
            align: 'center',

            render: imgUrl => (
                <Flex justify="center">
                    <Thumbnail imageUrl={imgUrl} sizePx={80} />
                </Flex>
            )
        },
        {
            title: 'Nazwa',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
            sortDirections: ['ascend', 'descend'],
            sorter: {
                compare: () => 0,
                multiple: 1
            },
            ...columnSearchProps
        },
        {
            title: 'EAN',
            dataIndex: 'ean',
            key: 'ean',
            width: '12%',
            sortDirections: ['ascend', 'descend'],
            sorter: {
                compare: () => 0,
                multiple: 1
            },
            ...columnSearchProps
        },
        {
            title: 'Kategoria',
            dataIndex: 'category',
            key: 'category',
            width: '20%',
            sortDirections: ['ascend', 'descend'],
            sorter: {
                compare: () => 0,
                multiple: 1
            },
            ...columnSearchProps
        },
        {
            title: 'Data aktualizacji',
            dataIndex: 'changedAt',
            key: 'changedAt',
            width: 200,
            sortDirections: ['ascend', 'descend'],
            sorter: {
                compare: () => 0,
                multiple: 1
            },
            render: (currChangeAt: number) => {
                return currChangeAt
                    ? dayjs.unix(currChangeAt).format('DD.MM.YYYY')
                    : 'Brak danych.';
            },
            ...columnSearchProps
        },
        {
            title: 'Aktualna cena',
            dataIndex: 'price',
            key: 'price',
            width: 200,
            fixed: 'right',
            sortDirections: ['ascend', 'descend'],
            sorter: {
                compare: () => 0,
                multiple: 1
            },
            render: (text: string) => {
                const num = Number(text);
                return isNaN(num) ? 'Brak danych.' : num.toFixed(2);
            },
            ...columnSearchProps
        },
        {
            title: '',
            dataIndex: 'prices',
            key: 'price',
            fixed: 'right',
            width: 50,
            render: (prices: Required<PriceData>[]) => {
                const { current, prev } = getLastPrices(prices);
                return current ? (
                    <PriceIndicator
                        prevPrice={prev?.price}
                        currentPrice={current.price}
                    />
                ) : (
                    ''
                );
            }
        }
    ];

    return (
        <div className="p-4">
            {products.error ? (
                <Empty
                    className="p-8"
                    description="Wystąpił błąd przy pobieraniu produktów."
                />
            ) : (
                <Table<DataType>
                    size="small"
                    loading={products.loading}
                    locale={{
                        emptyText: () =>
                            !products.loading && (
                                <Empty
                                    description="Brak danych."
                                    className="py-8"
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
                        expandedRowRender: product => (
                            <PriceChart
                                data={product.prices as Required<PriceData>[]}
                            />
                        )
                    }}
                    dataSource={getRowsFromProducts(products.data)}
                    onChange={handleTableChange}
                    scroll={{ y: 'calc(100vh - 208px)', x: 'max-content' }}
                />
            )}
        </div>
    );
}
