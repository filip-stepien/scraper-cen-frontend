import { Button } from 'antd';
import { useState } from 'react';
import { SettingsDrawer } from './SettingsDrawer';

export function SettingsButton() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleButtonClick = () => {
        setDrawerOpen(true);
    };

    return (
        <>
            <SettingsDrawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            />
            <Button onClick={handleButtonClick}>Ustawienia</Button>
        </>
    );
}
