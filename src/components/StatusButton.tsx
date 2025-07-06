import { Button } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { StatusDrawer } from './StatusDrawer';

export function StatusButton() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleButtonClick = () => {
        setDrawerOpen(true);
    };

    return (
        <>
            <StatusDrawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            />
            <Button
                onClick={handleButtonClick}
                icon={
                    <SyncOutlined spin style={{ color: 'rgb(22, 119, 255)' }} />
                }
            >
                Status
            </Button>
        </>
    );
}
