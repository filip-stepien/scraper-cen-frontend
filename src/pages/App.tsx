import { Button, Flex } from 'antd';
import { ProductTable } from '@/components/ProductTable';
import { CompanySelect } from '@/components/CompanySelect';
import { LogoutButton } from '@/components/LogoutButton';
import { useRerender } from '@/hooks/useRerender';

export function App() {
    const { key, rerender } = useRerender();
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
                        <Button onClick={rerender}>Wyczyść filtry</Button>
                    </Flex>
                    <Flex gap="small">
                        {/* <StatusButton />
                        <SettingsButton /> */}
                        <LogoutButton />
                    </Flex>
                </Flex>
                <ProductTable key={key} />
            </div>
        </div>
    );
}
