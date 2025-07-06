import { Button, Drawer } from 'antd';
import { SettingsForm } from './SettingsForm';

type Props = {
    open?: boolean;
    onClose?: () => void;
};

export function SettingsDrawer({ open, onClose }: Props) {
    return (
        <Drawer
            open={open}
            onClose={onClose}
            title='Ustawienia'
            extra={
                <Button onClick={onClose} type='primary'>
                    Zapisz
                </Button>
            }
        >
            <SettingsForm />
        </Drawer>
    );
}
