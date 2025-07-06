import { Flex } from 'antd';
import { ProductTable } from '../components/ProductTable';
import { CompanySelect } from '../components/CompanySelect';
import { SearchBar } from '../components/SearchBar';
import { SettingsButton } from '../components/SettingsButton';
import { StatusButton } from '../components/StatusButton';

export function App() {
    return (
        <div
            style={{
                boxSizing: 'border-box',
                padding: '16px',
                background: '#ebebeb',
                minHeight: '100vh'
            }}
        >
            <div
                style={{
                    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                    background: 'white',
                    borderRadius: '8px'
                }}
            >
                <Flex
                    justify='space-between'
                    gap='small'
                    style={{
                        padding: '16px 16px 0 16px'
                    }}
                >
                    <Flex gap='small'>
                        <CompanySelect />
                        <SearchBar />
                    </Flex>
                    <Flex gap='small'>
                        <StatusButton />
                        <SettingsButton />
                    </Flex>
                </Flex>
                <ProductTable />
            </div>
        </div>
    );
}
