import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
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
    down: {
        icon: <CaretDownOutlined />,
        color: 'red'
    },
    up: {
        icon: <CaretUpOutlined />,
        color: 'green'
    }
};

export function IconPriceIndicator({ prevPrice, currentPrice }: Props) {
    if (!prevPrice || prevPrice === currentPrice) {
        return;
    }

    let iconKey: string = 'up';

    if (currentPrice < prevPrice) {
        iconKey = 'down';
    }

    const { icon, color } = icons[iconKey];

    return <span style={{ color }}>{icon}</span>;
}
