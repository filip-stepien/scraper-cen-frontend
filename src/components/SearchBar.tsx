import type { SearchProps } from 'antd/es/input';
import { Input } from 'antd';

const { Search } = Input;

export function SearchBar() {
    const handleSearch: SearchProps['onSearch'] = (query: string) => {
        console.log(query);
    };

    return (
        <Search
            placeholder='Szukaj po frazie...'
            onSearch={handleSearch}
            className='w-full!'
        />
    );
}
