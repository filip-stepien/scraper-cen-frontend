import { SearchOutlined } from '@ant-design/icons';
import { Input, Button, type InputRef, Flex } from 'antd';
import { useState, type ChangeEventHandler, type RefObject } from 'react';

type Props = {
    searchInputRef: RefObject<InputRef | null>;
    onSearchText: (searchText: string) => void;
    onSearch: () => void;
    onClear: () => void;
    onClose: () => void;
};

export function SearchDropdown(props: Props) {
    const { searchInputRef, onSearchText, onSearch, onClear } = props;

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
            className="p-small! !w-fit"
            gap="small"
            onKeyDown={e => e.stopPropagation()}
        >
            <Input
                ref={searchInputRef}
                placeholder="Wyszukaj..."
                onPressEnter={onSearch}
                onChange={handleSearchTextChange}
                value={value}
                className="!text-sm"
            />
            <Flex className="w-full" justify="space-around" gap="small">
                <Button
                    type="primary"
                    onClick={onSearch}
                    icon={<SearchOutlined />}
                    className="!text-xs !py-0 !px-2.5 sm:px-4 lg:!text-sm lg:!py-2 !w-full"
                >
                    Szukaj
                </Button>
                <Button
                    onClick={handleClear}
                    className="!text-xs !py-0 !px-2.5 sm:px-4 lg:!text-sm lg:!py-2 !w-full"
                >
                    Wyczyść
                </Button>
            </Flex>
        </Flex>
    );
}
