import { MenuOutlined } from '@ant-design/icons';
import { Divider, Drawer, Space } from 'antd';
import { useState } from 'react';
import { CompanySelect } from './CompanySelect';
import { LogoutButton } from './LogoutButton';

type Props = {
    className?: string;
};

export function HamburgerMenu({ className = '' }: Props) {
    const [open, setOpen] = useState(false);

    const handleIconClick = () => {
        setOpen(prev => !prev);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Drawer
                open={open}
                onClose={handleDrawerClose}
                title="Menu"
                className="!w-full"
            >
                <Space direction="vertical" className="w-full">
                    <Space direction="vertical" className="w-full">
                        <span className="font-semibold">Źródło danych</span>
                        <CompanySelect className="!w-full" />
                    </Space>
                    <Divider className="!my-4" />
                    <LogoutButton className="w-full" />
                </Space>
            </Drawer>
            <MenuOutlined
                onClick={handleIconClick}
                className={'p-1 ' + className}
            />
        </>
    );
}
