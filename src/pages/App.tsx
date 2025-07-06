import { Flex } from 'antd';
import { ProductTable } from '@/components/ProductTable';
import { CompanySelect } from '@/components/CompanySelect';
import { SearchBar } from '@/components/SearchBar';
import { SettingsButton } from '@/components/SettingsButton';
import { StatusButton } from '@/components/StatusButton';
import { LogoutButton } from '@/components/LogoutButton';

export function App() {
    return (
        <div className='box-border p-4 bg-background min-h-screen'>
            <div className='shadow-primary bg-white rounded-md'>
                <Flex
                    justify='space-between'
                    gap='small'
                    className='pt-4! pl-4! pr-4!'
                >
                    <Flex gap='small'>
                        <CompanySelect />
                        <SearchBar />
                    </Flex>
                    <Flex gap='small'>
                        <StatusButton />
                        <SettingsButton />
                        <LogoutButton />
                    </Flex>
                </Flex>
                <ProductTable />
            </div>
        </div>
    );
}
