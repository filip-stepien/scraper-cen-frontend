import type { FilterResult } from '@/types';
import { useState } from 'react';
import { useRerender } from './useRerender';
import dayjs from 'dayjs';

const lookbackHours = import.meta.env.VITE_PRICE_LOOKBACK_HOURS;
const filterTimestamp = dayjs().subtract(lookbackHours, 'hour').unix();

export function useNewProductsFilter() {
    const { key, rerender } = useRerender();
    const [filterActive, setFilterActive] = useState(false);
    const [filter, setFilter] = useState<FilterResult>();

    const onToggle = () => {
        if (filterActive) {
            setFilterActive(false);
            setFilter(undefined);
        } else {
            setFilterActive(true);
            setFilter({ changedAt: [`>${filterTimestamp}`] });
        }
    };

    const onReset = () => {
        setFilterActive(false);
        setFilter(undefined);
        rerender();
    };

    return { key, filterActive, filter, onToggle, onReset };
}
