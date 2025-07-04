import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { Flex } from 'antd';
import type { JSX } from 'react';

type Props = {
    oldPrice: number;
    newPrice: number;
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

export function PriceIndicator({ oldPrice, newPrice }: Props) {
    if (newPrice === oldPrice) {
        return <span>{newPrice}</span>;
    }

    let iconKey: string = 'up';

    if (newPrice < oldPrice) {
        iconKey = 'down';
    }

    const { icon, color } = icons[iconKey];

    return (
        <Flex justify="space-between" style={{ color }}>
            <span>{newPrice}</span>
            <span>{icon}</span>
        </Flex>
    );
}
