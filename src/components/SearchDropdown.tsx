import { SearchOutlined } from '@ant-design/icons';
import { Input, Space, Button, type InputRef, Flex } from 'antd';
import { type ChangeEventHandler, type RefObject } from 'react';

type Props = {
    searchInputRef: RefObject<InputRef | null>;
    searchText?: string;
    onSearchText: (searchText: string) => void;
    onSearch: (searchText: string) => void;
    onClear: () => void;
    onClearAll: () => void;
};

export function SearchDropdown(props: Props) {
    const {
        searchInputRef,
        searchText,
        onSearchText,
        onSearch,
        onClear,
        onClearAll
    } = props;

    const handleSearch = () => {
        const searchText = searchInputRef.current?.input?.value;
        if (searchText !== undefined) {
            onSearch(searchText);
        }
    };

    const handleSearchTextChange: ChangeEventHandler<HTMLInputElement> = e => {
        onSearchText(e.target.value);
    };

    return (
        <Flex
            vertical
            className="p-small!"
            gap="small"
            onKeyDown={e => e.stopPropagation()}
        >
            <Input
                ref={searchInputRef}
                placeholder="Wyszukaj..."
                onPressEnter={handleSearch}
                value={searchText}
                onChange={handleSearchTextChange}
            />
            <Space className="flex">
                <Button
                    type="primary"
                    onClick={handleSearch}
                    icon={<SearchOutlined />}
                >
                    Szukaj
                </Button>
                <Button onClick={onClear}>Wyczyść</Button>
                <Button type="link" onClick={onClearAll}>
                    Wyczyść wszystkie filtry
                </Button>
            </Space>
        </Flex>
    );
}
