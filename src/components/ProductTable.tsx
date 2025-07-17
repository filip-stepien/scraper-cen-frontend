import { Empty, Flex, Table } from 'antd';
import type { TableProps } from 'antd';
import type { FilterResult, PriceData, Product } from '../types';
import { useProducts } from '../hooks/useProducts';
import { Thumbnail } from './Thumbnail';
import { PriceChart } from './PriceChart';
import { useProductTableSearch } from '@/hooks/useProductTableSearch';
import { PriceCell } from './PriceCell';
import { ChangedDateCell } from './ChangedDateCell';

type Props = {
    externalFilters?: FilterResult;
};

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
    return products.filter(filterUndefinedValues).map(product => ({
        ...product,
        key: product.ean
    }));
}

export function ProductTable({ externalFilters = {} }: Props) {
    const { columnSearchProps } = useProductTableSearch<DataType>();
    const { products, pagination, aggregation } = useProducts<DataType>(
        'castorama',
        externalFilters
    );

    const handleTableChange: TableProps<DataType>['onChange'] = (
        tablePage,
        tableFilters,
        sorters
    ) => {
        aggregation.setSorters(sorters);
        aggregation.setFilters(tableFilters);
        pagination.setPageNumber(tablePage.current);
        pagination.setPageSize(tablePage.pageSize);
    };

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Miniatura',
            dataIndex: 'imageUrl',
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
            sortDirections: ['ascend', 'descend'],
            sorter: {
                compare: () => 0,
                multiple: 1
            },
            render: (name, record) => (
                <a href={record.url} target="_blank" className="underline">
                    {name}
                </a>
            ),
            ...columnSearchProps
        },
        {
            title: 'EAN',
            dataIndex: 'ean',
            key: 'ean',
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
            render: (changedAt: number) => (
                <ChangedDateCell changedAt={changedAt} />
            )
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
            render: (text, record) => (
                <PriceCell
                    priceText={text}
                    allPrices={record.prices as Required<PriceData>[]}
                    changedAt={record.changedAt as number}
                />
            )
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
