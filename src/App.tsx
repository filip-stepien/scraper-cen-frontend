import { Flex } from 'antd';
import { ProductTable } from './components/ProductTable';
import { CompanySelect } from './components/CompanySelect';
import { SearchBar } from './components/SearchBar';
import { SettingsButton } from './components/SettingsButton';
import { StatusButton } from './components/StatusButton';

export function App() {
    return (
        <div style={{ width: '100%' }}>
            <Flex
                justify="space-between"
                gap="small"
                style={{ padding: '16px 16px 0 16px' }}
            >
                <Flex gap="small">
                    <CompanySelect />
                    <SearchBar />
                </Flex>
                <Flex gap="small">
                    <StatusButton />
                    <SettingsButton />
                </Flex>
            </Flex>
            <ProductTable />
        </div>
    );
}
