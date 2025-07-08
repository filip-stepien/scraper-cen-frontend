import { SearchOutlined } from '@ant-design/icons';
import { Input, Space, Button, type InputRef, Flex } from 'antd';
import { useState, type ChangeEventHandler, type RefObject } from 'react';

type Props = {
    searchInputRef: RefObject<InputRef | null>;
    onSearchText: (searchText: string) => void;
    onSearch: () => void;
    onClear: () => void;
    onClose: () => void;
};

export function SearchDropdown(props: Props) {
    const { searchInputRef, onSearchText, onSearch, onClear, onClose } = props;

    const [value, setValue] = useState('');

    const handleSearchTextChange: ChangeEventHandler<HTMLInputElement> = e => {
        setValue(e.target.value);
        onSearchText(e.target.value);
    };

    const handleClear = () => {
        setValue('');
        onClear();
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
                onPressEnter={onSearch}
                onChange={handleSearchTextChange}
                value={value}
            />
            <Space className="flex">
                <Button
                    type="primary"
                    onClick={onSearch}
                    icon={<SearchOutlined />}
                >
                    Szukaj
                </Button>
                <Button onClick={handleClear}>Wyczyść</Button>
                <Button type="link" onClick={onClose}>
                    Zamknij
                </Button>
            </Space>
        </Flex>
    );
}
