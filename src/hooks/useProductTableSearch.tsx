import { SearchDropdown } from '@/components/SearchDropdown';
import { SearchOutlined } from '@ant-design/icons';
import { type InputRef, type TableColumnType } from 'antd';
import { useState, useRef, useCallback } from 'react';

type DataIndex<TDataType> = keyof TDataType;

type SearchedColumn<TDataType> = {
    dataIndex: DataIndex<TDataType>;
    searchText: string;
};

export function useProductTableSearch<TDataType>(
    dataIndexes: DataIndex<TDataType>[]
) {
    const initialSearchColumnsState = dataIndexes.map(idx => ({
        dataIndex: idx,
        searchText: ''
    }));

    const searchInputRef = useRef<InputRef>(null);
    const [searchedColumns, setSearchedColumns] = useState<
        SearchedColumn<TDataType>[]
    >(initialSearchColumnsState);

    const handleDropdownSearchText = useCallback(
        (searchText: string, dataIndex: DataIndex<TDataType>) => {
            setSearchedColumns(prev =>
                prev.map(col =>
                    col.dataIndex === dataIndex ? { ...col, searchText } : col
                )
            );
        },
        [] // Funkcja nie zależy od żadnych zmiennych, więc pusta tablica zależności
    );

    const handleDropdownSearch = useCallback(
        (searchText: string, dataIndex: DataIndex<TDataType>) => {
            setSearchedColumns(prev =>
                prev.map(col =>
                    col.dataIndex === dataIndex ? { ...col, searchText } : col
                )
            );
        },
        []
    );

    const handleDropdownClear = useCallback(
        (dataIndex: DataIndex<TDataType>) => {
            setSearchedColumns(prev =>
                prev.map(col =>
                    col.dataIndex === dataIndex
                        ? { ...col, searchText: '' }
                        : col
                )
            );
        },
        []
    );

    const handleDropdownClearAll = useCallback(() => {
        setSearchedColumns(prev =>
            prev.map(col => ({ ...col, searchText: '' }))
        );
    }, []);

    const getSearchText = useCallback(
        (dataIndex: DataIndex<TDataType>) => {
            return searchedColumns.find(col => col.dataIndex === dataIndex);
        },
        [searchedColumns]
    );

    const isColumnFiltered = useCallback(
        (dataIndex: DataIndex<TDataType>) => {
            const foundColumn = searchedColumns.find(
                col => col.dataIndex === dataIndex
            );
            return Boolean(foundColumn?.searchText);
        },
        [searchedColumns]
    );

    const getColumnSearchProps = useCallback(
        (dataIndex: DataIndex<TDataType>): TableColumnType<TDataType> => ({
            filterDropdown: () => (
                <SearchDropdown
                    searchInputRef={searchInputRef}
                    searchText={getSearchText(dataIndex)?.searchText}
                    onSearchText={text =>
                        handleDropdownSearchText(text, dataIndex)
                    }
                    onSearch={text => handleDropdownSearch(text, dataIndex)}
                    onClear={() => handleDropdownClear(dataIndex)}
                    onClearAll={handleDropdownClearAll}
                />
            ),
            filterIcon: () => (
                <SearchOutlined
                    style={{
                        color: isColumnFiltered(dataIndex)
                            ? '#1677ff'
                            : undefined
                    }}
                />
            ),
            filterDropdownProps: {
                onOpenChange(open) {
                    if (open) {
                        setTimeout(() => searchInputRef.current?.select(), 100);
                    }
                }
            }
        }),
        [
            handleDropdownSearchText,
            handleDropdownSearch,
            handleDropdownClear,
            handleDropdownClearAll,
            getSearchText,
            isColumnFiltered
        ]
    );

    return {
        searchedColumns,
        getColumnSearchProps
    };
}
