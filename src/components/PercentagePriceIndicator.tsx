type Props = {
    currentPrice: number;
    prevPrice?: number | null;
};

const indicators: Record<string, { colorClass: string; sign: string }> = {
    down: {
        colorClass: 'text-red-400',
        sign: '-'
    },
    up: {
        colorClass: 'text-green-500',
        sign: '+'
    }
};

export function PercentagePriceIndicator({ prevPrice, currentPrice }: Props) {
    if (!prevPrice || prevPrice === 0 || prevPrice === currentPrice) {
        return;
    }

    const isUp = currentPrice > prevPrice;
    const indicatorKey = isUp ? 'up' : 'down';
    const { sign, colorClass } = indicators[indicatorKey];

    const percentageChange = Math.abs(
        ((currentPrice - prevPrice) / prevPrice) * 100
    );

    return (
        <span className={'font-semibold ' + colorClass}>
            ({sign}
            {Math.round(percentageChange)}%)
        </span>
    );
}
