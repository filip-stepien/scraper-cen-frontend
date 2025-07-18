import { Empty, Flex, Table } from 'antd';
import type { TableProps } from 'antd';
import type { FilterResult, PriceData, Product } from '../types';
import { useProducts } from '../hooks/useProducts';
import { Thumbnail } from './Thumbnail';
import { PriceChart } from './PriceChart';
import { useProductTableSearch } from '@/hooks/useProductTableSearch';
import { PriceCell } from './PriceCell';
import { ChangedDateCell } from './ChangedDateCell';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { CloseCircleOutlined } from '@ant-design/icons';

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
    const { lg, width } = useBreakpoints();
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

    const columnClassNames = lg ? undefined : 'text-xs';

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Miniatura',
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            align: 'center',
            hidden: !lg,
            className: columnClassNames,
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
            className: columnClassNames,
            width: lg ? undefined : width / 1.5 - 70,
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
            title: 'Kategoria',
            dataIndex: 'category',
            key: 'category',
            className: columnClassNames,
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
            className: columnClassNames,
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
            width: lg ? 200 : 150,
            className: columnClassNames,
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
            width: lg ? 200 : width / 3,
            fixed: 'right',
            className: columnClassNames,
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

    if (products.error) {
        return (
            <Empty
                className="p-8"
                description="Wystąpił błąd przy pobieraniu produktów."
                image={
                    <CloseCircleOutlined className="text-[90px] !text-neutral-6" />
                }
            />
        );
    }

    if (!products.loading && products.data.length === 0) {
        return <Empty className="p-8" description="Brak danych." />;
    }

    return (
        <div className="p-2 lg:p-4">
            <Table<DataType>
                size={lg ? 'small' : 'middle'}
                loading={products.loading}
                locale={{
                    triggerAsc: 'Kliknij, aby sortować rosnąco',
                    triggerDesc: 'Kliknij, aby sortować malejąco',
                    cancelSort: 'Kliknij, aby anulować sortowanie',
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
                    pageSizeOptions: [20, 50, 100],
                    defaultPageSize: 20,
                    current: pagination.pageNumber,
                    pageSize: pagination.pageSize,
                    total: pagination.total,
                    locale: { items_per_page: ' / strona' }
                }}
                expandable={{
                    expandedRowRender: product => (
                        <PriceChart
                            height={lg ? 300 : 200}
                            data={product.prices as Required<PriceData>[]}
                        />
                    )
                }}
                dataSource={getRowsFromProducts(products.data)}
                onChange={handleTableChange}
                className="lg:!h-auto !h-screen"
                scroll={{
                    y: lg
                        ? 'calc(100vh - 208px)'
                        : 'calc(100dvh - 152px - 0.5rem)',
                    x: 'max-content'
                }}
            />
        </div>
    );
}
