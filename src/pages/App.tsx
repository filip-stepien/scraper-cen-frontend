import { Button, Flex } from 'antd';
import { ProductTable } from '@/components/ProductTable';
import { CompanySelect } from '@/components/CompanySelect';
import { LogoutButton } from '@/components/LogoutButton';
import { DisplayNewProductsButton } from '@/components/DisplayNewButton';
import { useNewProductsFilter } from '@/hooks/useNewProductsFilter';

export function App() {
    const { key, filterActive, filter, onToggle, onReset } =
        useNewProductsFilter();

    return (
        <div className="box-border p-4 bg-background min-h-screen">
            <div className="shadow-primary bg-white rounded-md">
                <Flex
                    justify="space-between"
                    gap="small"
                    className="pt-4! pl-4! pr-4!"
                >
                    <Flex gap="small">
                        <CompanySelect />
                        <Button onClick={onReset}>Wyczyść filtry</Button>
                        <DisplayNewProductsButton
                            clicked={filterActive}
                            onClick={onToggle}
                        />
                    </Flex>
                    <LogoutButton />
                </Flex>
                <ProductTable key={key} externalFilters={filter} />
            </div>
        </div>
    );
}
