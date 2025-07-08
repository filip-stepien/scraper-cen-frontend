import { SearchDropdown } from '@/components/SearchDropdown';
import { SearchOutlined } from '@ant-design/icons';
import { type InputRef, type TableColumnType } from 'antd';
import { useRef } from 'react';

export function useProductTableSearch<TDataType>() {
    const searchInputRef = useRef<InputRef>(null);

    const columnSearchProps: TableColumnType<TDataType> = {
        filterDropdown: filterProps => (
            <SearchDropdown
                searchInputRef={searchInputRef}
                onClose={filterProps.close}
                onSearchText={text => filterProps.setSelectedKeys([text])}
                onSearch={() => {
                    filterProps.confirm({ closeDropdown: true });
                }}
                onClear={() => {
                    filterProps.clearFilters?.();
                    filterProps.confirm({ closeDropdown: true });
                }}
            />
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined
                style={{ color: filtered ? '#1677ff' : undefined }}
            />
        ),
        filterDropdownProps: {
            onOpenChange(open) {
                if (open) {
                    setTimeout(() => searchInputRef.current?.select(), 100);
                }
            }
        }
    };

    return { columnSearchProps };
}
