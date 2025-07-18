import { Button, Flex } from 'antd';
import { ProductTable } from '@/components/ProductTable';
import { CompanySelect } from '@/components/CompanySelect';
import { LogoutButton } from '@/components/LogoutButton';
import { DisplayNewProductsButton } from '@/components/DisplayNewButton';
import { useNewProductsFilter } from '@/hooks/useNewProductsFilter';
import { HamburgerMenu } from '@/components/HamburgerMenu';

export function App() {
    const { key, filterActive, filter, onToggle, onReset } =
        useNewProductsFilter();

    return (
        <div className="box-border lg:p-4 bg-background min-h-screen">
            <div className="shadow-primary bg-white lg:rounded-md">
                <Flex
                    justify="space-between"
                    gap="small"
                    className="!p-2 !pb-1 sm:!p-4 sm:!pb-1 overflow-auto"
                >
                    <Flex gap="small">
                        <CompanySelect className="lg:!flex !hidden" />
                        <Button
                            onClick={onReset}
                            className="!text-xs !py-0 !px-2.5 sm:px-4 lg:!text-sm lg:!py-2"
                        >
                            Wyczyść filtry
                        </Button>
                        <DisplayNewProductsButton
                            clicked={filterActive}
                            onClick={onToggle}
                            className="!text-xs !py-0 !px-2.5 sm:px-4 lg:!text-sm lg:!py-2"
                        />
                    </Flex>
                    <LogoutButton className="!hidden lg:!block" />
                    <HamburgerMenu className="lg:!hidden" />
                </Flex>
                <ProductTable key={key} externalFilters={filter} />
            </div>
        </div>
    );
}
