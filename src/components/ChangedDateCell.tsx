import { isProductNew } from '@/lib/products';
import { Flex, Tag } from 'antd';
import dayjs from 'dayjs';

type Props = {
    changedAt?: number;
    hidden?: boolean;
};

export function ChangedDateCell({ changedAt, hidden }: Props) {
    const isNew = isProductNew(changedAt);

    return changedAt ? (
        <Flex className="gap-2.5">
            <span>{dayjs.unix(changedAt).format('DD.MM.YYYY')}</span>
            {isNew && !hidden && (
                <Tag className="w-fit" color="blue">
                    <span className="!text-[0.9em]">Nowe dane</span>
                </Tag>
            )}
        </Flex>
    ) : (
        'Brak danych'
    );
}
