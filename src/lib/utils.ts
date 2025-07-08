import type { SorterResult } from 'antd/es/table/interface';

export function isSorterArray<T>(
    sorter: SorterResult<T> | SorterResult<T>[] | undefined
): sorter is SorterResult<T>[] {
    return Array.isArray(sorter);
}
