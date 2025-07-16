import { Flex, Space } from 'antd';
import { IconPriceIndicator } from './IconPriceIndicator';
import { PercentagePriceIndicator } from './PercentagePriceIndicator';
import type { PriceData } from '@/types';
import dayjs from 'dayjs';

type Props = {
    priceText: string;
    allPrices: Required<PriceData>[];
    changedAt: number;
};

function shouldDisplayPriceIndicators(changedAt?: number) {
    const hours = Number(import.meta.env.VITE_PRICE_LOOKBACK_HOURS);

    if (!changedAt || !hours || isNaN(hours)) {
        return false;
    }

    const changedAtDate = dayjs.unix(changedAt);
    const cutoff = dayjs().subtract(hours, 'hour');

    return changedAtDate.isAfter(cutoff);
}

function formatPrice(num: number) {
    return num.toFixed(2).toString().replace(/\./, ',') + ' zł';
}

function getLastPrices(prices: Required<PriceData>[]): {
    current: Required<PriceData> | null;
    prev: Required<PriceData> | null;
} {
    const sortedPrices = [...prices].sort((a, b) => b.changedAt - a.changedAt);
    return prices.length === 0
        ? { current: null, prev: null }
        : {
              current: sortedPrices[0],
              prev: sortedPrices.length > 1 ? sortedPrices[1] : null
          };
}

export function PriceCell({ allPrices, priceText, changedAt }: Props) {
    const num = Number(priceText);
    const { current, prev } = getLastPrices(allPrices);

    if (isNaN(num) || !current) {
        return 'Brak danych.';
    }

    const displayIndicators =
        prev?.price && shouldDisplayPriceIndicators(changedAt);

    const lookbackHours: string | undefined = import.meta.env
        .VITE_PRICE_LOOKBACK_HOURS;

    const lastUpdateLabel =
        'Poprzednia cena' +
        (lookbackHours ? ` (ostatnie ${lookbackHours}h):` : ':');

    return (
        <Flex vertical>
            <Space>
                {displayIndicators && (
                    <IconPriceIndicator
                        currentPrice={current.price}
                        prevPrice={prev?.price}
                    />
                )}
                <span className="font-semibold">{formatPrice(num)}</span>
            </Space>
            {displayIndicators && (
                <Flex vertical className="text-font-secondary text-xs">
                    <span>{lastUpdateLabel}</span>
                    <div>
                        <span className="font-bold">
                            {formatPrice(prev.price)}{' '}
                        </span>
                        <PercentagePriceIndicator
                            currentPrice={current.price}
                            prevPrice={prev.price}
                        />
                    </div>
                </Flex>
            )}
        </Flex>
    );
}
