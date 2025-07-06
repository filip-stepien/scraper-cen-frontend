import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import type { JSX } from 'react';

type Props = {
    currentPrice: number;
    prevPrice?: number | null;
};

type Icon = {
    icon: JSX.Element;
    color: string;
};

const icons: Record<string, Icon> = {
    up: {
        icon: <CaretUpOutlined />,
        color: 'red'
    },
    down: {
        icon: <CaretDownOutlined />,
        color: 'green'
    }
};

export function PriceIndicator({ prevPrice, currentPrice }: Props) {
    if (!prevPrice || prevPrice === currentPrice) {
        return <span>{currentPrice}</span>;
    }

    let iconKey: string = 'up';

    if (currentPrice < prevPrice) {
        iconKey = 'down';
    }

    const { icon, color } = icons[iconKey];

    return (
        <Space size='middle' style={{ color }}>
            <span>{currentPrice}</span>
            <span>{icon}</span>
        </Space>
    );
}
